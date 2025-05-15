describe('#theora', () => {
  //Need to remove timestamp from mp4 to compare files
	it('should transcode Big_Buck_Bunny_Trailer_400p.ogv to mp4 without worker', (done) => {
		create_test('video',
			'universal-video_1',
			"solver_minimal_1",
			"ogg_1;vorbis_1;theora_1;isobmff_1;ffmpeg-x264_1",
			"https://bevara.ddns.net/test-signals/ogv/Big_Buck_Bunny_Trailer_400p.ogv",
			null,
			done,
			"mp4",
			false,
			false
		);
	}).timeout(50000);
});
