describe('#theora', () => {
	// Structural test, not a byte-hash reference - see create_structural_video_test
	// in test.js for why. Confirmed working with "libx264_1" (the native
	// encoder, see libx264.js) + "isobmff_1": produces a real ~4.5MB mp4
	// with both a video and an audio (vorbis) track.
	it('should transcode Big_Buck_Bunny_Trailer_400p.ogv to mp4 with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"ogg_1;vorbis_1;theora_1;isobmff_1;libx264_1",
			"https://bevara.ddns.net/test-signals/ogv/Big_Buck_Bunny_Trailer_400p.ogv",
			done,
			['vide', 'soun']
		);
	}).timeout(60000);
});
