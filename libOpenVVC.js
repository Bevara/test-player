describe('#libOpenVVC', () => {
	// Same "video" tag / re-encode-to-mp4 structural limitation documented
	// in libde265.js and libmpeg2.js (UVideo.ts hardcodes destination
	// "out.mp4" + transcode ["c=avc"], so testing any raw video decoder
	// needs an encoder (libx264_1) in the graph regardless of what's being
	// tested) - functional-only test (no hash reference) to exercise
	// isobmff demux + VVdeC VVC decode wiring end to end.
	it('should decode NovosobornayaSquare_640x360.mp4 with worker', (done) => {
		create_test('video',
			'universal-video_1',
			"solver_1",
			"libOpenVVC_1;isobmff_1;libx264_1",
			TS + "VVC/NovosobornayaSquare_640x360.mp4",
			null,
			done,
			"mp4",
			false,
			false
		);
	}).timeout(300000);

});
