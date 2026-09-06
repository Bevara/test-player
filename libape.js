describe('#libape', () => {
	// Monkey's Audio is lossless, so the reference is verifiable at the source:
	// the decoded PCM is byte for byte the WAV that was encoded to produce the
	// test file.
	it('should decode ff-16b-2c-44100hz.ape to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libape_1",
			TS + "APE/ff-16b-2c-44100hz.ape",
			TS + "out/libape/ff-16b-2c-44100hz.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(60000);
});
