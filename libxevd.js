describe('#libxevd', () => {
	// Same "video" tag structure as libdavs2.js and libuavs3d.js: UVideo.ts
	// hardcodes destination "out.mp4" and transcode ["c=avc"], so a raw video
	// decoder always needs the encoder (libx264_1) and the mp4 muxer
	// (isobmff_1) in the graph, and the check is functional.
	//
	// solver_1, not solver_minimal_1: isobmff needs about fifty GPAC symbols
	// the minimal solver does not export (see libalac.js for the detail).
	//
	// The signal is 50 frames of 320x180 encoded with a natively built xeve,
	// and all 50 come out: the mp4 this chain produces was compared frame by
	// frame with the same file decoded by a natively built xevd, and the two
	// agree to ~61 dB PSNR - the difference x264's re-encoding accounts for.
	//
	// Note the format: an EVC elementary stream is not start-code delimited
	// like AVS2/AVS3. Each NAL unit is prefixed by its own 4-byte length, and
	// the filter reads that through xevd_info() rather than by hand.
	it('should decode testcard.evc with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"libxevd_1;isobmff_1;libx264_1",
			TS + "EVC/testcard.evc",
			done,
			['vide']
		);
	}).timeout(120000);
});
