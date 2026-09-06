describe('#libdca', () => {
	// Reference captured from the pipeline, then cross-checked against ffmpeg's
	// own DTS decoder: same length and identical sample for sample. dcadec is a
	// standalone decoder, not an ffmpeg wrapper - ffmpeg is only used here as a
	// second opinion.
	it('should decode ff-16b-2c-48000hz.dts to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libdca_1",
			TS + "DTS/ff-16b-2c-48000hz.dts",
			TS + "out/libdca/ff-16b-2c-48000hz.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(60000);
});
