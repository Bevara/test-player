describe('#flvdmx', () => {
	// FLV demuxer test - FLV is a whole-file container (not a link in a chain),
	// and its video output goes through the same structural limitation as
	// libde265.js, libmpeg2.js and libgif.js: UVideo.ts hardcodes destination
	// "out.mp4" and transcode ["c=avc"], so libx264_1 has to be in the graph.
	//
	// Only functional test (no hash reference): the x264 output is not checked,
	// the point is that all frames make it through the graph with their timing.
	// The test signals are encoded with H.264 (AVC) + AAC audio.
	it('should decode sample_640x360.flv through the video path with worker', (done) => {
		create_test('video',
			'universal-video_1',
			"solver_minimal_1",
			"flvdmx_1;libx264_1",
			TS + "FLV/sample_640x360.flv",
			null,
			done,
			"mp4",
			false,
			false
		);
	}).timeout(180000);

	it('should decode sample_1280x720.flv through the video path with worker', (done) => {
		create_test('video',
			'universal-video_1',
			"solver_minimal_1",
			"flvdmx_1;libx264_1",
			TS + "FLV/sample_1280x720.flv",
			null,
			done,
			"mp4",
			false,
			false
		);
	}).timeout(180000);
});
