describe('#libsbc', () => {
	// Byte-hash comparison (create_test with "wav"): a WAV out of this chain is
	// reproducible.
	//
	// A whole-file decoder rather than a chain link: a raw .sbc file is a run
	// of self-describing frames - each carries its own frequency, channel mode,
	// block count and bitpool - so there is no header for a demuxer to read.
	// The pid properties are posted at the usual A2DP defaults and corrected
	// once the first frame has been decoded.
	//
	// Where the reference comes from: decoding the same file with ffmpeg, an
	// independent SBC implementation - 0 differing samples out of 881920.
	// The reference below is the pipeline output, captured as documented in
	// AGENTS.md step 7c.
	it('should decode testcard.sbc to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libsbc_1",
			TS + "SBC/testcard.sbc",
			TS + "out/libsbc/testcard.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);
});
