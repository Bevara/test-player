describe('#libdds', () => {
	// Pixel comparison rather than create_test's byte hash: PNG output is not
	// byte-reproducible across runs even when the decoded image is identical
	// (see create_pixel_test in test.js).
	//
	// The reference here comes from bcdec itself (through a standalone harness
	// running the same block-decode code as the filter), not from an
	// independent decoder: ffmpeg's own BC1 decoder was checked against it and
	// agrees to within +/-1 per channel, which is the usual difference in how
	// the two interpolate the BC1 colour endpoints - close enough to confirm
	// the container parsing and block layout, too close to reuse as a
	// byte-exact reference.
	it('should decode kodim23_bc1.dds to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"libdds_1",
			TS + "DDS/kodim23_bc1.dds",
			TS + "out/libdds/kodim23_bc1.png",
			done,
			"rgb"
		);
	}).timeout(60000);
});
