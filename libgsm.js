describe('#libgsm', () => {
	// Byte-hash comparison (create_test with "wav"): a WAV out of this chain is
	// reproducible.
	//
	// A whole-file decoder rather than a chain link: a raw .gsm file has no
	// header and no container, just 33-byte frames end to end at a fixed 8 kHz
	// mono, so there is nothing for a demuxer to do.
	//
	// Where the reference comes from: decoding the same file with ffmpeg, an
	// independent GSM 06.10 implementation - 0 differing samples out of 80160.
	// The reference below is the pipeline output, captured as documented in
	// AGENTS.md step 7c.
	it('should decode testcard.gsm to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libgsm_1",
			TS + "GSM/testcard.gsm",
			TS + "out/libgsm/testcard.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);
});
