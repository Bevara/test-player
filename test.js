
window.TS = 'https://bevara.ddns.net/test-signals/';

function create_test(tag, extension, using_attribute, with_atribute, test_file, reference_file, done, out, useCache, noWorker) {
  let img;
  new Promise(function (resolve, reject) {
    img = document.createElement(tag, { "is": extension });
    img.setAttribute("src", test_file);

    if (using_attribute) {
      img.setAttribute("using", using_attribute);
    }

    if (with_atribute) {
      img.setAttribute("with", with_atribute);
    }

    img.setAttribute("script-directory", "http://localhost:9876/base/build/dist/");

    if (out) {
      img.setAttribute("out", out);
    }

    if (useCache) {
      img.setAttribute("use-cache", "");
    }

    if (!noWorker) {
      img.setAttribute("use-worker", "");
    }

    img.setAttribute("test", "");

    document.body.appendChild(img);
    console.log(using_attribute + ";" + with_atribute + " : Tag " + tag + " extended by " + extension + " has been added to the DOM");
    img.decodingPromise.then(src => {
      if (reference_file) {
        return Promise.all([
          fetch(src),
          fetch(reference_file)
        ]);
      } else {
        resolve();
        return Promise.all([]);
      }
    })
      .then((responses) => {
        if (responses.length === 0) {
          return;
        }
        console.log(using_attribute + ";" + with_atribute + " : Both test and reference signal has been processed");
        arrayBuffers = responses.map(response => response.arrayBuffer());
        return Promise.all(arrayBuffers)
          .then(buffers => {
            console.log(using_attribute + ";" + with_atribute + " : Calculating hash of the results");
            hashedBuffers = buffers.map(buffer => crypto.subtle.digest('SHA-256', buffer));
            return Promise.all(hashedBuffers)
              .then(hashedResults => {
                console.log(using_attribute + ";" + with_atribute + " : Transforming hashes of to hex values");
                const result = new Uint8Array(hashedResults[0]);
                const ref = new Uint8Array(hashedResults[1]);
                /* Array.from(...) first: Uint8Array.prototype.map() returns
                 * another Uint8Array, so a string return value from the
                 * callback gets silently coerced back to a number (NaN -> 0
                 * for any byte whose hex digits include a-f) instead of
                 * building a real hex string - only decimal-looking digests
                 * came out right before this fix. Didn't affect pass/fail
                 * (both sides went through the same lossy transform) but
                 * made the logged "hex values" wrong/misleading. */
                const resultHex = Array.from(result).map(b => b.toString(16).padStart(2, '0')).join('');
                const refHex = Array.from(ref).map(b => b.toString(16).padStart(2, '0')).join('');
                console.log(using_attribute + ";" + with_atribute + " : hex values of result is " + resultHex + " and expected is " + refHex);
                expect(resultHex).to.equal(refHex);
                console.log(using_attribute + ";" + with_atribute + " : Test OK");
                resolve();
              });
          });
      })
      .catch(reject);
  })
    .then(
      () => {
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
        done();
      },
      (err) => {
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
        done(err);
      }
    );
}

/* Looks for an ISOBMFF 'hdlr' box and checks its handler-type field (4
 * bytes, after box-size/type header is already consumed by the caller
 * finding 'hdlr' itself: version(1)+flags(3)+predefined(4) follow
 * immediately after the 'hdlr' fourcc). Shared by every "video" tag
 * structural test - see create_structural_video_test below. */
function hasHandlerType(bytes, type) {
  const needle = [type.charCodeAt(0), type.charCodeAt(1), type.charCodeAt(2), type.charCodeAt(3)];
  for (let i = 0; i + 3 < bytes.length; i++) {
    if (bytes[i] === 0x68 && bytes[i + 1] === 0x64 && bytes[i + 2] === 0x6c && bytes[i + 3] === 0x72) {
      const handlerOffset = i + 4 + 8;
      if (bytes[handlerOffset] === needle[0] && bytes[handlerOffset + 1] === needle[1] &&
        bytes[handlerOffset + 2] === needle[2] && bytes[handlerOffset + 3] === needle[3]) {
        return true;
      }
    }
  }
  return false;
}

const HANDLER_NAMES = { vide: 'video', soun: 'audio' };

/* For "video" tag tests: the produced mp4 embeds a creation_time
 * timestamp that differs on every run (confirmed non-byte-reproducible:
 * two back-to-back runs of the exact same input hash differently), so
 * create_test's byte-hash comparison against a fixed reference can never
 * reliably pass for this tag - see libx264.js's original comment for the
 * regression this was written to catch. Verifies the box structure
 * instead: that every handler type in expectHandlers (e.g. ['vide'] or
 * ['vide', 'soun']) is actually present as a track in the output. */
function create_structural_video_test(using_attribute, with_atribute, test_file, done, expectHandlers) {
  let el = document.createElement('video', { "is": "universal-video_1" });
  el.setAttribute("src", test_file);
  if (using_attribute) el.setAttribute("using", using_attribute);
  if (with_atribute) el.setAttribute("with", with_atribute);
  el.setAttribute("script-directory", "http://localhost:9876/base/build/dist/");
  el.setAttribute("test", "");
  document.body.appendChild(el);

  el.decodingPromise
    .then(src => fetch(src))
    .then(resp => resp.arrayBuffer())
    .then(buf => {
      const bytes = new Uint8Array(buf);
      if (el.parentNode) el.parentNode.removeChild(el);

      for (const h of expectHandlers) {
        if (!hasHandlerType(bytes, h)) {
          done(new Error(`Regression: no ${HANDLER_NAMES[h] || h} track (hdlr '${h}') found in the output mp4`));
          return;
        }
      }
      done();
    })
    .catch(err => {
      if (el.parentNode) el.parentNode.removeChild(el);
      done(err);
    });
}

/* For image ("out=rgb") tests: the PNG this filter chain's raw-RGB output
 * produces isn't byte-reproducible across runs/environments even when the
 * decoded content is correct (confirmed on libheif: decoding both the
 * result and a stale reference to raw pixels showed them byte-for-byte
 * identical even though the encoded PNG files - and their hashes -
 * didn't match; the compressor's filter/zlib choices vary, not the
 * actual decoded content). Decodes both images via canvas and compares
 * actual pixels instead of create_test's raw file-byte hash, so the
 * comparison doesn't depend on the compressor's non-determinism. */
function create_pixel_test(tag, extension, using_attribute, with_atribute, test_file, reference_file, done, out) {
  let el = document.createElement(tag, { "is": extension });
  el.setAttribute("src", test_file);
  if (using_attribute) el.setAttribute("using", using_attribute);
  if (with_atribute) el.setAttribute("with", with_atribute);
  el.setAttribute("script-directory", "http://localhost:9876/base/build/dist/");
  if (out) el.setAttribute("out", out);
  el.setAttribute("test", "");
  document.body.appendChild(el);

  const toPixels = (url) => fetch(url)
    .then(r => r.blob())
    .then(blob => createImageBitmap(blob))
    .then(bitmap => {
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(bitmap, 0, 0);
      return { width: bitmap.width, height: bitmap.height, data: ctx.getImageData(0, 0, bitmap.width, bitmap.height).data };
    });

  el.decodingPromise
    .then(src => Promise.all([toPixels(src), toPixels(reference_file)]))
    .then(([result, reference]) => {
      if (el.parentNode) el.parentNode.removeChild(el);

      if (result.width !== reference.width || result.height !== reference.height) {
        throw new Error(`dimension mismatch: got ${result.width}x${result.height}, expected ${reference.width}x${reference.height}`);
      }
      if (result.data.length !== reference.data.length) {
        throw new Error(`pixel buffer length mismatch: got ${result.data.length}, expected ${reference.data.length}`);
      }
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i] !== reference.data[i]) {
          throw new Error(`pixel data mismatch at byte offset ${i}: got ${result.data[i]}, expected ${reference.data[i]}`);
        }
      }
      done();
    })
    .catch(err => {
      if (el.parentNode) el.parentNode.removeChild(el);
      done(err);
    });
}
