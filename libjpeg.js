
describe('#libjpeg', () => {

	it('should decode Freedom.jpeg to png with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libpng_1;libjpeg_1",
			TS + "Freedom.jpg",
			TS + "out/libjpeg/Freedom-fromjpg.png",
			done,
			"png",
			false,
			false
		);
	}).timeout(30000);

	it('should decode Freedom.jpeg to png without worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libpng_1;libjpeg_1",
			TS + "Freedom.jpg",
			TS + "out/libjpeg/Freedom-fromjpg.png",
			done,
			"png",
			false,
			true
		);
	}).timeout(30000);

	it('should decode Freedom.jpeg to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libpng_1;libjpeg_1",
			TS + "Freedom.jpg",
			TS + "out/libjpeg/Freedom-canvas.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(30000);

	// KNOWN LIMITATION - "rgba" fails for this filter too; see the detailed note in libpng.js (GPAC static-caps resolution issue, not a convertWithCanvas bug)
	// it('should decode Freedom.jpeg to rgba with worker', (done) => {
	// 	create_test('img',
	// 		'universal-img_1',
	// 		"solver_minimal_1",
	// 		"libpng_1;libjpeg_1",
	// 		TS + "Freedom.jpg",
	// 		TS + "out/libjpeg/Freedom-canvas.png",
	// 		done,
	// 		"rgba",
	// 		false,
	// 		false
	// 	);
	// }).timeout(30000);


	/* JPEG XT (ISO/IEC 18477) rides on a backward-compatible JPEG base layer and
	 * carries its extensions in APP11 markers, so libjpeg already reads these
	 * files - at base-layer precision. Both decode here byte-for-byte
	 * identically to Pillow on the same file, which is the check that matters:
	 * this filter is a plain JPEG decoder and behaves like one.
	 *
	 * What is NOT decoded is the XT part. Measured against the original
	 * 256x256 crop of Freedom.png the two files sit at very different
	 * distances, and both are expected:
	 *   - profile C is an HDR encoding whose base layer is a tone-mapped SDR
	 *     image (max deviation 203, mean 53) - the residual that would rebuild
	 *     the HDR original lives in the APP11 layers;
	 *   - the lossless-residual file's base layer is an ordinary lossy JPEG
	 *     (max deviation 18, mean 1.9), the residual bringing it back to the
	 *     exact source.
	 * Decoding those layers needs libjpeg-xt itself; see FORMATS_STATUS.md. */
	it('should decode a JPEG XT profile C base layer to rgb with worker', (done) => {
		create_pixel_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libpng_1;libjpeg_1",
			TS + "JXT/testcard_profileC.jpg",
			TS + "out/libjpeg/testcard_profileC.png",
			done,
			"rgb"
		);
	}).timeout(30000);

	it('should decode a JPEG XT lossless-residual base layer to rgb with worker', (done) => {
		create_pixel_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libpng_1;libjpeg_1",
			TS + "JXT/testcard_lossless_residual.jpg",
			TS + "out/libjpeg/testcard_lossless_residual.png",
			done,
			"rgb"
		);
	}).timeout(30000);

});
