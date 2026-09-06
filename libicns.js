describe('#libicns', () => {
	// Pixel comparison rather than create_test's byte hash: PNG output is not
	// byte-reproducible across runs even when the decoded image is identical
	// (see create_pixel_test in test.js).
	it('should decode test1.icns to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"libicns_1",
			TS + "ICNS/test1.icns",
			TS + "out/libicns/test1.png",
			done,
			"rgb"
		);
	}).timeout(60000);
});
