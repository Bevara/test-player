describe('#libgif', () => {
	// Pixel comparison rather than create_test's byte hash: PNG output is not
	// byte-reproducible across runs even when the decoded image is identical
	// (see create_pixel_test in test.js).
	it('should decode testcard_256colors.gif to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"libgif_1",
			TS + "GIF/testcard_256colors.gif",
			TS + "out/libgif/testcard_256colors.png",
			done,
			"rgb"
		);
	}).timeout(60000);

	// The animation goes through the video path, which in this repo always ends
	// in an encoder: UVideo.ts hardcodes destination "out.mp4" and transcode
	// ["c=avc"], so libx264_1 has to be in the graph whatever is being tested
	// (same structural limitation documented in libde265.js and libmpeg2.js).
	// Functional test, no reference: the x264 output is not what is being
	// checked here, the point is that all eight frames make it through the
	// graph with their timing.
	it('should decode animated_8frames.gif through the video path with worker', (done) => {
		create_test('video',
			'universal-video_1',
			"solver_1",
			"libgif_1;libx264_1",
			TS + "GIF/animated_8frames.gif",
			null,
			done,
			"mp4",
			false,
			false
		);
	}).timeout(120000);
});
