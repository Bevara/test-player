describe('#libdavs2', () => {
	// Same "video" tag structure as libuavs3d.js: UVideo.ts hardcodes
	// destination "out.mp4" and transcode ["c=avc"], so a raw video decoder
	// always needs the encoder (libx264_1) and the mp4 muxer (isobmff_1) in the
	// graph, and the check is functional - that frames traverse the chain.
	//
	// solver_1, not solver_minimal_1: isobmff needs about fifty GPAC symbols
	// the minimal solver does not export (see libalac.js for the detail).
	//
	// The signal holds 50 frames of 320x180 and all 50 come out: the mp4 this
	// produces was compared frame by frame against the same file decoded by a
	// natively built davs2, and the two agree to ~58 dB PSNR - the difference
	// x264's own re-encoding accounts for.
	it('should decode testcard.avs2 with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"libdavs2_1;isobmff_1;libx264_1",
			TS + "AVS2/testcard.avs2",
			done,
			['vide']
		);
	}).timeout(120000);
});
