describe('#libjxr', () => {
	// Pixel comparison rather than create_test's byte hash: PNG output is not
	// byte-reproducible across runs even when the decoded image is identical
	// (see create_pixel_test in test.js).
	//
	// Where the reference comes from: JXR/testcard.jxr is a *lossless* JPEG XR
	// encoding (JxrEncApp -q 1) of the 256x256 centre crop of Freedom.png, so
	// the decoder's output can be checked against the encoder's input rather
	// than against itself. It was: decoding this file through the pipeline and
	// comparing to that crop gave 0 differing bytes out of 196608. The
	// reference below is that pipeline output, captured as documented in
	// AGENTS.md step 7c.
	//
	// The lossy companion (testcard_lossy_q06.jxr) is deliberately not tested
	// against a fixed reference: it decodes correctly (max deviation 21, mean
	// 2.34 against the same source) but that is a quality figure, not an
	// identity, and it exercises the same code path as the lossless file.
	it('should decode testcard.jxr to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"libjxr_1",
			TS + "JXR/testcard.jxr",
			TS + "out/libjxr/testcard.png",
			done,
			"rgb"
		);
	}).timeout(60000);
});
