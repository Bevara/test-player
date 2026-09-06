describe('#libcodec2', () => {
	// Byte-hash comparison (create_test with "wav"): a WAV out of this chain is
	// reproducible.
	//
	// A whole-file decoder: a .c2 file is a seven-byte header naming the mode,
	// then packed frames. Headerless .bin streams are refused rather than
	// guessed at - nothing in them says which of the seven modes they use.
	//
	// Where the reference comes from: decoding the same file with the upstream
	// c2dec, compiled natively from the same libcodec2. 4026 samples out of
	// 80000 differ, by at most 40 (mean 0.17 LSB, about 0.1% of full scale).
	// That is larger than the +-1 the other codecs show, and expected: Codec 2
	// is a floating-point sinusoidal coder, so rounding differences accumulate
	// through LPC and synthesis. Part of it is this build's own doing -
	// solver_minimal_1 exports no single-precision maths, so codec2_stubs.c
	// routes cosf/sinf/expf and friends through their double versions, which
	// is *more* precise than the native single-precision path rather than less.
	it('should decode testcard.c2 to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libcodec2_1",
			TS + "C2/testcard.c2",
			TS + "out/libcodec2/testcard.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);
});
