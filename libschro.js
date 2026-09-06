describe('#libschro', () => {
	// Same "video" tag structure as libdavs2.js and libxevd.js: UVideo.ts
	// hardcodes destination "out.mp4" and transcode ["c=avc"], so a raw video
	// decoder always needs the encoder (libx264_1) and the mp4 muxer
	// (isobmff_1) in the graph, and the check is functional.
	//
	// solver_1, not solver_minimal_1: isobmff needs about fifty GPAC symbols
	// the minimal solver does not export (see libalac.js for the detail).
	//
	// Dirac, not VC-2. schroedinger 1.0.11 predates the standardisation of
	// VC-2's high-quality profile, and its SCHRO_PARSE_CODE_IS_LOW_DELAY only
	// tests (code & 0x88) == 0x88 - so an HQ picture (parse code 0xE8, which is
	// what ffmpeg's "vc2" encoder emits, and it has no option for anything
	// else) is read with the low-delay slice syntax: every coefficient comes
	// out zero and the picture is a uniform grey. The filter refuses such a
	// stream rather than decoding it into grey.
	//
	// The signal is therefore Dirac core syntax, 50 frames of 320x180 encoded
	// with schroedinger's own encoder built natively. It is inter-coded (48 of
	// the 50 picture parse codes are 0x0E, one reference), so it exercises the
	// reference motion renderer this build selects in place of the one that
	// generates machine code at run time.
	//
	// Where the numbers come from: the encode turned out lossless, so ffmpeg's
	// own Dirac decoder reproduces the source frames byte for byte, and a
	// natively built schroedinger agrees with ffmpeg on all 50 frames with no
	// differing sample at all. The mp4 this chain produces matches that
	// reference at ~64 dB PSNR - x264's re-encoding loss and nothing else.
	it('should decode testcard.drc with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"libschro_1;isobmff_1;libx264_1",
			TS + "DIRAC/testcard.drc",
			done,
			['vide']
		);
	}).timeout(120000);
});
