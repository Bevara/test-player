// describe('#ffmpeg-flac', () => {

// 	it('should decode Symphony6.flac with worker', (done) => {
// 		create_test('audio',
// 			'universal-audio_1',
// 			"solver_1",
// 			"ffmpeg-flac_1",
// 			"https://bevara.ddns.net/test-signals/flac/Symphony6.flac",
// 			"https://bevara.ddns.net/test-signals/out/flac/Symphony6.wav",
// 			done,
// 			"wav",
// 			false,
// 			false
// 		);
// 	}).timeout(5000);

// 	it('should decode Symphony6.flac without worker', (done) => {
// 		create_test('audio',
// 			'universal-audio_1',
// 			"solver_1",
// 			"ffmpeg-flac_1",
// 			"https://bevara.ddns.net/test-signals/flac/Symphony6.flac",
// 			"https://bevara.ddns.net/test-signals/out/flac/Symphony6.wav",
// 			done,
// 			"wav",
// 			false,
// 			true
// 		);
// 	}).timeout(5000);
// });