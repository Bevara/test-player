describe('#libmpeg2', () => {
	// Structural test, not a byte-hash reference - see create_structural_video_test
	// in test.js for why. Also fixed here: this test used to list
	// "ffmpeg-x264_1" as the encoder, which failed with "Cannot find any
	// filter providing encoding for c=avc" - switched to "libx264_1" (the
	// native encoder, see libx264.js), which also needs "isobmff_1"
	// explicitly in "with" for muxing. Confirmed working: produces a real
	// ~6MB mp4 with a video track. Raw MPEG ES source has no audio, so
	// only 'vide' is checked.
	//
	// The libmpeg2 decoder itself (reframe_mpeg2v.c + dec_mpeg2.c) was also
	// independently verified correct outside of this test harness: both a
	// native build (via Homebrew's libmpeg2) and a standalone WASM build (the
	// exact .a linked into this filter, run via Node) decode centaur_1.mpg
	// (320x240, 419 frames, correct 4:2:0 chroma dimensions and NTSC frame
	// period) without error.
	it('should decode centaur_1.mpg (raw MPEG ES) with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"libmpeg2_1;isobmff_1;libx264_1",
			TS + "mpeg1/centaur_1.mpg",
			done,
			['vide']
		);
	}).timeout(60000);
});
