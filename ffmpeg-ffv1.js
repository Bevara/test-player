describe('#ffmpeg-ffv1', () => {
	// FFV1 is the one codec here whose reference implementation is ffmpeg
	// itself: it was designed inside ffmpeg and there is no second decoder to
	// build against. So this is ffmpeg configured with --disable-everything and
	// the FFV1 decoder alone, which is 774 Ko of WebAssembly - the same source
	// built with ffmpeg's defaults costs 14,8 Mo.
	//
	// FFV1 has no codec table entry upstream in ff_common.c, so nothing could
	// route an FFV1 pid to ffdec even though GPAC has had GF_CODECID_FFV1 all
	// along; the module adds the mapping, and avidmx names the fourcc.
	//
	// FFV1 is lossless, so the only loss in this chain is x264's own
	// re-encoding: 50 frames of 320x180, 63.4 dB PSNR against a native ffmpeg
	// decode of the same file.
	//
	// solver_1, not solver_minimal_1: isobmff needs about fifty GPAC symbols
	// the minimal solver does not export (see libalac.js for the detail).
	it('should decode testcard.avi (FFV1) with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"avidmx_1;ffmpeg-ffv1_1;isobmff_1;libx264_1",
			TS + "FFV1/testcard.avi",
			done,
			['vide']
		);
	}).timeout(120000);
});
