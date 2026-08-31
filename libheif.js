describe('#libheif', () => {
	// Pixel comparison instead of create_test's raw-byte SHA-256 hash: the
	// PNG this filter's "rgb" output produces isn't byte-reproducible
	// across runs/environments (confirmed by decoding both the result and
	// the reference PNG to raw pixels - they were byte-for-byte identical
	// even when the encoded PNG files differed and their hashes didn't
	// match - the compressor's filter/zlib choices vary, not the actual
	// decoded content). Same non-reproducibility rationale as the
	// "video tag" tests in libx264.js/theora.js, just decode-only instead
	// of re-encode - so this decodes both images via canvas and compares
	// actual pixels rather than file bytes.
	it('should decode example_flower_hevc to rgb with worker', (done) => {
		let img;
		const referenceUrl = "https://bevara.ddns.net/test-signals/out/libheif/example_flower_hevc.png";

		const toPixels = (blobUrlOrHttpUrl) => fetch(blobUrlOrHttpUrl)
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

		img = document.createElement('img', { "is": "universal-img_1" });
		img.setAttribute("src", "https://bevara.ddns.net/test-signals/heif/example_flower_hevc.heif");
		img.setAttribute("using", "solver_minimal_1");
		img.setAttribute("with", "libheif_1");
		img.setAttribute("script-directory", "http://localhost:9876/base/build/dist/");
		img.setAttribute("out", "rgb");
		img.setAttribute("test", "");
		document.body.appendChild(img);

		img.decodingPromise
			.then(src => Promise.all([toPixels(src), toPixels(referenceUrl)]))
			.then(([result, reference]) => {
				if (img.parentNode) img.parentNode.removeChild(img);

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
				if (img.parentNode) img.parentNode.removeChild(img);
				done(err);
			});
	}).timeout(60000);

	// it('should decode example.heic to rgb with worker', (done) => {
	// 	create_test('img',
	// 		'universal-img_1',
	// 		"solver_minimal_1",
	// 		"libheif_1",
	// 		"https://bevara.ddns.net/test-signals/heif/example.heic",
	// 		"https://bevara.ddns.net/test-signals/out/libheif/example.png",
	// 		done,
	// 		"rgb",
	// 		false,
	// 		false
	// 	);
	// }).timeout(60000);
});
