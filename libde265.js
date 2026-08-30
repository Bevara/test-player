describe('#libde265', () => {
	// Same "video" tag / re-encode-to-mp4 structural limitation documented
	// in libmpeg2.js (UVideo.ts hardcodes destination "out.mp4" + transcode
	// ["c=avc"], so testing any raw video decoder needs an encoder
	// (ffmpeg-x264_1) in the graph regardless of what's being tested) -
	// functional-only test (no hash reference) to exercise isobmff demux +
	// libde265 HEVC decode wiring end to end.
	it('should decode hevcds_720p30_2M_videoonly.mp4 with worker', (done) => {
		create_test('video',
			'universal-video_1',
			"solver_1",
			"libde265_1;isobmff_1;ffmpeg-x264_1",
			TS + "HEVC/hevcds_720p30_2M_videoonly.mp4",
			null,
			done,
			"mp4",
			false,
			false
		);
	}).timeout(120000);

});
