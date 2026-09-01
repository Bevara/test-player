describe('#libx264', () => {
	// Non-regression test for the "solver_1 + libx264_1" bug
	// fixed on 2026-08-31: loader.js used to force-instantiate the "wcenc"
	// filter unconditionally (regardless of use-webcodec), so once wcenc
	// failed ("Codec/Profile not supported") the video PID was disconnected
	// with no fallback to libx264_1's encx264, leaving an audio-only mp4.
	//
	// Structural test, not a byte-hash reference - see
	// create_structural_video_test in test.js for why.
	it('should transcode Big_Buck_Bunny_Trailer_400p.ogv to mp4 with both audio and video tracks', (done) => {
		create_structural_video_test(
			"solver_1",
			"ogg_1;vorbis_1;theora_1;isobmff_1;libx264_1",
			TS + "ogv/Big_Buck_Bunny_Trailer_400p.ogv",
			done,
			['vide', 'soun']
		);
	}).timeout(90000);
});
