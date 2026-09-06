describe('#liblc3', () => {
	// Byte-hash comparison (create_test with "wav"): a WAV out of this chain is
	// reproducible.
	//
	// A whole-file decoder: LC3 has no container of its own, and the .lc3 file
	// the reference tools write is an 18-byte header plus one length-prefixed
	// block per frame. The filter drops the encoder's algorithmic delay off the
	// first frame, exactly as dlc3 does, and emits the sample count the header
	// announces.
	//
	// Where the reference comes from: decoding the same file with the upstream
	// dlc3, compiled natively from the same liblc3 - 97 samples out of 960000
	// differ, by 1 at most, which is the wasm build's float rounding.
	it('should decode testcard.lc3 to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"liblc3_1",
			TS + "LC3/testcard.lc3",
			TS + "out/liblc3/testcard.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);
});
