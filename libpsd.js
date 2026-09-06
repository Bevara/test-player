describe('#libpsd', () => {
	// Pixel comparison rather than create_test's byte hash: PNG output is not
	// byte-reproducible across runs even when the decoded image is identical
	// (see create_pixel_test in test.js).
	//
	// Where the reference comes from: PSD/testcard_rle.psd stores the flattened
	// 256x256 centre crop of Freedom.png, so the decoder is checked against the
	// encoder's input rather than against itself. Both the RLE and the
	// uncompressed variant decoded to 0 differing bytes out of 196608, and
	// Pillow - an independent PSD reader - agrees with the same source on both
	// files. The reference below is the pipeline output for the RLE file,
	// captured as documented in AGENTS.md step 7c.
	it('should decode testcard_rle.psd to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"libpsd_1",
			TS + "PSD/testcard_rle.psd",
			TS + "out/libpsd/testcard_rle.png",
			done,
			"rgb"
		);
	}).timeout(60000);
});
