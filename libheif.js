describe('#libheif', () => {
	it('should decode example_flower_hevc to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libheif_1",
			"https://bevara.ddns.net/test-signals/heif/example_flower_hevc.heif",
			"https://bevara.ddns.net/test-signals/out/libheif/example_flower_hevc.png",
			done,
			"rgb",
			false,
			true
		);
	}).timeout(60000);

	// it('should decode example.heic to rgb with worker', (done) => {
	// 	create_test('img',
	// 		'universal-img_1',
	// 		"solver_minimal_1",
	// 		"libheif_1",
	// 		"https://bevara.ddns.net/test-signals/heif/example.heic",
	// 		"https://bevara.ddns.net/test-signals/out/libheif/example.png",
	// 		done,
	// 		"rgb",
	// 		false,
	// 		false
	// 	);
	// }).timeout(60000);
});
