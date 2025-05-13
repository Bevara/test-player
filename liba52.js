describe('#liba52', () => {
	it('should decode Motivation.ac3 to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"liba52_1",
			"https://bevara.ddns.net/test-signals/ac3/Motivation.ac3",
			"https://bevara.ddns.net/test-signals/out/ac3/Motivation.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(5000);

	it('should decode Motivation.ac3 to wav without worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"liba52_1",
			"https://bevara.ddns.net/test-signals/ac3/Motivation.ac3",
			"https://bevara.ddns.net/test-signals/out/ac3/Motivation.wav",
			done,
			"wav",
			false,
			true
		);
	}).timeout(5000);
});
