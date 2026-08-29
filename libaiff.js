
describe('#libaiff', () => {
	it('should decode M1F1-int16-AFsp.aif to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libaiff_1",
			TS + "AIFF/M1F1-int16-AFsp.aif",
			TS + "out/libaiff/M1F1-int16-AFsp.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);

	it('should decode M1F1-int24-AFsp.aif to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libaiff_1",
			TS + "AIFF/M1F1-int24-AFsp.aif",
			TS + "out/libaiff/M1F1-int24-AFsp.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);

	it('should decode ff-16b-1c-44100hz.aiff to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libaiff_1",
			TS + "ff-16b-1c-44100hz.aiff",
			TS + "out/libaiff/ff-16b-1c-44100hz.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);
});
