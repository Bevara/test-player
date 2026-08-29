
describe('#libopus', () => {
	it('should decode ff-16b-2c-44100hz.opus to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"ogg_1;libopus_1",
			TS + "ff-16b-2c-44100hz.opus",
			TS + "out/libopus/ff-16b-2c-44100hz.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);

	it('should decode ff-16b-1c-44100hz.opus to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"ogg_1;libopus_1",
			TS + "ff-16b-1c-44100hz.opus",
			TS + "out/libopus/ff-16b-1c-44100hz.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);
});
