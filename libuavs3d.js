describe('#libuavs3d', () => {
	// Same "video" tag structure as libde265.js and libmpeg2.js: UVideo.ts
	// hardcodes destination "out.mp4" and transcode ["c=avc"], so any raw video
	// decoder needs an encoder (libx264_1) and the mp4 muxer (isobmff_1) in the
	// graph regardless of what is being tested, and the check is functional -
	// no hash reference - that frames traverse the chain to the encoder.
	//
	// solver_1, not solver_minimal_1: isobmff needs about fifty GPAC symbols
	// the minimal solver does not export (see libalac.js for the detail).
	//
	// About the signal: AVS3/SFTI_640x360.bin holds 600 picture start codes but
	// only 10 frames come out. That is the file, not the filter - uavs3d's own
	// uavs3dec, built natively from the same sources, decodes exactly the same
	// 10 frames and then stops with "Failed: -6". The structural test below
	// therefore checks what it can: that a video track reaches the output mp4.
	it('should decode SFTI_640x360.avs3 with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"libuavs3d_1;isobmff_1;libx264_1",
			TS + "AVS3/SFTI_640x360.avs3",
			done,
			['vide']
		);
	}).timeout(120000);
});
