describe('#libwavpack', () => {
	// Reference captured from the pipeline, then checked against ffmpeg's own
	// wavpack decoder: identical sample for sample, as it should be for a
	// lossless codec.
	it('should decode ff-16b-2c-44100hz.wv to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libwavpack_1",
			TS + "WV/ff-16b-2c-44100hz.wv",
			TS + "out/libwavpack/ff-16b-2c-44100hz.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(60000);
});
