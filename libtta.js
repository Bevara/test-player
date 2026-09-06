describe('#libtta', () => {
	// Byte-hash comparison (create_test with "wav"): a WAV out of this chain is
	// reproducible.
	//
	// Where the reference comes from: TTA is lossless, so the decode was
	// checked against the audio that was encoded rather than against another
	// decoder - 0 differing samples out of 882000.
	//
	// Two things worth knowing about this filter. libtta's C API is a
	// singleton: tta_decoder_new, tta_decoder_process_stream and
	// tta_decoder_done all work on one hidden global, so two TTA streams
	// cannot be decoded at once in the same module - dec_tta.c refuses the
	// second rather than letting it corrupt the first. And libtta uses
	// setjmp/longjmp, so the module imports invoke_i, invoke_ii, invoke_iii and
	// invoke_iiii; solver_minimal_1's glue defines all four (it carries a much
	// richer set than solver_1, which has only three trampolines in total).
	it('should decode testcard.tta to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libtta_1",
			TS + "TTA/testcard.tta",
			TS + "out/libtta/testcard.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);
});
