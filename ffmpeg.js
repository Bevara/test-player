describe('#ffmpeg', () => {

	it('should decode medical_demo.mpg with worker', (done) => {
		create_test('video',
			'universal-video_1',
			"solver_1",
			"ffmpeg_1",
			"https://bevara.ddns.net/test-signals/mpeg1/medical_demo.mpg",
			"https://bevara.ddns.net/test-signals/out/mpeg/medical_demo.mp4",
			done,
			"mp4",
			false,
			false
		);
	}).timeout(100000);

	it('should decode medical_demo.mpg without worker', (done) => {
		create_test('video',
			'universal-video_1',
			"solver_1",
			"ffmpeg_1",
			"https://bevara.ddns.net/test-signals/mpeg1/medical_demo.mpg",
			"https://bevara.ddns.net/test-signals/out/mpeg/medical_demo.mp4",
			done,
			"mp4",
			false,
			true
		);
	}).timeout(100000);
});