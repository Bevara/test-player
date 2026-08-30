describe('#libvpx', () => {
	// Same "video" tag / re-encode-to-mp4 structural limitation documented
	// in libmpeg2.js (UVideo.ts hardcodes destination "out.mp4" + transcode
	// ["c=avc"], so testing any raw video decoder needs an encoder
	// (ffmpeg-x264_1) in the graph regardless of what's being tested) -
	// functional-only test (no hash reference) to exercise webmdmx demux +
	// libvpx VP9 decode wiring end to end.
	it('should decode UshaikaRiverEmb_640x360.webm (VP9) with worker', (done) => {
		create_test('video',
			'universal-video_1',
			"solver_1",
			"libvpx_1;webmdmx_1;ffmpeg-x264_1",
			TS + "VP9/UshaikaRiverEmb_640x360.webm",
			null,
			done,
			"mp4",
			false,
			false
		);
	}).timeout(120000);
});
