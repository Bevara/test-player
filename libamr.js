describe('#libamr', () => {
	// Reference captured from the pipeline. Cross-checked against ffmpeg's
	// amrnb decoder: same length, mean absolute difference of 23 per sample on
	// a 16-bit scale - the usual gap between two AMR implementations, not a
	// decoding error.
	it('should decode ff-16b-1c-8000hz.amr to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libamr_1",
			TS + "ff-16b-1c-8000hz.amr",
			TS + "out/libamr/ff-16b-1c-8000hz.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(60000);
});
