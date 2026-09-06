describe('#libjbig2', () => {
	// Pixel comparison rather than create_test's byte hash: PNG output is not
	// byte-reproducible across runs even when the decoded image is identical
	// (see create_pixel_test in test.js).
	it('should decode annex-h.jbig2 to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"libjbig2_1",
			TS + "JBIG2/annex-h.jbig2",
			TS + "out/libjbig2/annex-h.png",
			done,
			"rgb"
		);
	}).timeout(60000);
});
