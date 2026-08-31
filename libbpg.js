describe('#libbpg', () => {
	// Pixel comparison, not create_test's raw-byte hash - see
	// create_pixel_test in test.js for why (PNG compression isn't
	// byte-reproducible across runs/environments even when the decoded
	// content is correct).
	it('should decode photo.bpg to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"libbpg_1",
			TS + "bpg/photo.bpg",
			TS + "out/libbpg/photo.png",
			done,
			"rgb"
		);
	}).timeout(60000);
});
