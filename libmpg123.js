
describe('#libmpg123', () => {
	it('should decode ff-16b-2c-44100hz.mp3 to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"mm_solver_minimal_1.0.1",
			"libmpg123_1",
			TS + "mp3/ff-16b-2c-44100hz.mp3",
			TS + "out/libmpg123/ff-16b-2c-44100hz.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);

	it('should decode ff-16b-1c-44100hz.mp3 to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"mm_solver_minimal_1.0.1",
			"libmpg123_1",
			TS + "mp3/ff-16b-1c-44100hz.mp3",
			TS + "out/libmpg123/ff-16b-1c-44100hz.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);
});
