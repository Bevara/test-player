describe('#vorbis', () => {
	it('should decode Median_test.ogg to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_1",
			"vorbis_1",
			"https://bevara.ddns.net/test-signals/ogg/Median_test.ogg",
			"https://bevara.ddns.net/test-signals/out/ogg/Median_test.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(5000);

	it('should decode Median_test.ogg to wav without worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_1",
			"vorbis_1",
			"https://bevara.ddns.net/test-signals/ogg/Median_test.ogg",
			"https://bevara.ddns.net/test-signals/out/ogg/Median_test.wav",
			done,
			"wav",
			false,
			true
		);
	}).timeout(5000);
});