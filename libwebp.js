describe('#libwebp', () => {
	// Pixel comparison rather than create_test's byte hash: PNG output is not
	// byte-reproducible across runs even when the decoded image is identical
	// (see create_pixel_test in test.js).
	it('should decode testcard_lossy.webp to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"libwebp_1",
			TS + "WEBP/testcard_lossy.webp",
			TS + "out/libwebp/testcard_lossy.png",
			done,
			"rgb"
		);
	}).timeout(60000);
});
