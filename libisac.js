describe('#libisac', () => {
	// Byte-hash comparison (create_test with "wav"), whole-file decoder on
	// solver_minimal_1, same shape as libilbc and libsilk.
	//
	// iSAC has no library and no file format, and both facts shaped this
	// filter. It was removed from WebRTC in 2022 and nothing packages it, so
	// the sources are a vendored snapshot of the last revision where the codec
	// and the signal processing routines it calls still matched - see the
	// filter's README for the revision. It only ever travelled over RTP, so
	// the only container that exists is the bitstream dump WebRTC's own test
	// program writes: per frame, a big-endian 16-bit length then the payload,
	// with no magic and no sampling rate. Hence srate as an option, 16 kHz
	// wideband by default, 32 kHz for super-wideband.
	//
	// The reference is the pipeline output, captured as AGENTS.md step 7c
	// describes, checked against the same sources built natively: of 159840
	// samples, 1230 differ and none by more than 1. iSAC main is the floating
	// point variant of the codec, so that is the arithmetic difference between
	// an x86-64 and a wasm build, the same order as the Speex result.
	it('should decode testcard.isac to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libisac_1",
			TS + "ISAC/testcard.isac",
			TS + "out/libisac/testcard.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(60000);
});
