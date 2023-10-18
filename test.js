
function create_test(tag, extension, using_attribute, with_atribute, test_file, reference_file, done, out, useCache, noWorker) {
  new Promise(function (resolve) {
    const img = document.createElement(tag, { "is": extension });
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
        console.log(using_attribute + ";" + with_atribute + " : Both test and reference signal has been processed");
        arrayBuffers = responses.map(response => response.arrayBuffer());
        Promise.all(arrayBuffers)
          .then(buffers => {
            console.log(using_attribute + ";" + with_atribute + " : Calculating hash of the results");
            hashedBuffers = buffers.map(buffer => crypto.subtle.digest('SHA-256', buffer));
            Promise.all(hashedBuffers)
              .then(hashedResults => {
                console.log(using_attribute + ";" + with_atribute + " : Transforming hashes of to hex values");
                const result = new Uint8Array(hashedResults[0]);
                const ref = new Uint8Array(hashedResults[1]);
                const resultHex = result.map(b => b.toString(16).padStart(2, '0')).join('');
                const refHex = ref.map(b => b.toString(16).padStart(2, '0')).join('');
                console.log(using_attribute + ";" + with_atribute + " : hex values of result is " + resultHex + " and expected is " + refHex);
                expect(resultHex).to.equal(refHex);
                console.log(using_attribute + ";" + with_atribute + " : Test OK");
                //document.body.removeChild(img);
                resolve();
              });
          });
      });
  })
    .then(done);
}