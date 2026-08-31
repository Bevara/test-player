describe('#libvpx', () => {
	// Structural test, not a byte-hash reference - see create_structural_video_test
	// in test.js for why. Also fixed here: this test used to list
	// "ffmpeg-x264_1" as the encoder, which fails to connect entirely -
	// switched to "libx264_1" (the native encoder, see libx264.js), which
	// also needs "isobmff_1" explicitly in "with" for muxing. Confirmed
	// working: produces a real ~11MB mp4 with a video track. VP9 source
	// has no audio track, so only 'vide' is checked.
	it('should decode UshaikaRiverEmb_640x360.webm (VP9) with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"libvpx_1;webmdmx_1;isobmff_1;libx264_1",
			TS + "VP9/UshaikaRiverEmb_640x360.webm",
			done,
			['vide']
		);
	}).timeout(120000);
});
