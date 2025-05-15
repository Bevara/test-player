describe('#libmad', () => {
	it('should decode Radioactive.mp3 to wav without worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libmad_1",
			"https://bevara.ddns.net/test-signals/Radioactive.mp3",
			"https://bevara.ddns.net/test-signals/out/maddec/Radioactive.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(5000);

});
