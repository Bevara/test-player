
describe('#libflac', () => {
	it('should decode ff-16b-2c-44100hz.flac to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libflac_1",
			TS + "ff-16b-2c-44100hz.flac",
			TS + "out/libflac/ff-16b-2c-44100hz.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);

	it('should decode ff-16b-1c-44100hz.flac to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libflac_1",
			TS + "ff-16b-1c-44100hz.flac",
			TS + "out/libflac/ff-16b-1c-44100hz.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);

	it('should decode recit16bit.flac to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libflac_1",
			TS + "recit16bit.flac",
			TS + "out/libflac/recit16bit.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);
});
