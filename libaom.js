describe('#libaom', () => {
	// Structural test, not a byte-hash reference - see create_structural_video_test
	// in test.js for why. Also fixed here: this test used to list
	// "ffmpeg-x264_1" as the encoder, which fails to connect entirely
	// ("No filter chain found for PID ... in filter ffenc:libx264") -
	// switched to "libx264_1" (the native encoder, see libx264.js), which
	// also needs "isobmff_1" explicitly in "with" for muxing (ffmpeg-x264_1
	// apparently handled that internally). AV1 source has no audio track,
	// so only 'vide' is checked.
	it('should decode CityHall_640x360.webm with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"libaom_1;webmdmx_1;isobmff_1;libx264_1",
			TS + "AV1/CityHall_640x360.webm",
			done,
			['vide']
		);
	}).timeout(120000);
});
