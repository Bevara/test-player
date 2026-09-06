describe('#libpgf', () => {
	// Pixel comparison rather than create_test's byte hash: PNG output is not
	// byte-reproducible across runs even when the decoded image is identical
	// (see create_pixel_test in test.js).
	//
	// Where the reference comes from: PGF/testcard_lossless.pgf encodes the
	// 256x256 centre crop of Freedom.png losslessly, so the decoder can be
	// checked against the encoder's input rather than against itself. It was:
	// 0 differing bytes out of 196608. The companion testcard_q4.pgf came out
	// at a maximum deviation of 17 from the same source, which is the exact
	// figure IMAGE_FORMATS.md already recorded for a libpgf round trip at that
	// quality - two independent paths agreeing on the same number.
	//
	// The reference below is the lossless pipeline output, captured as
	// documented in AGENTS.md step 7c.
	it('should decode testcard_lossless.pgf to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"libpgf_1",
			TS + "PGF/testcard_lossless.pgf",
			TS + "out/libpgf/testcard_lossless.png",
			done,
			"rgb"
		);
	}).timeout(60000);
});
