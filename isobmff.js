describe('#isobmff', () => {
	it('should decode example_flower_jpeg.heif to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_1",
			"libjpeg_1;isobmff_1",
			"https://bevara.ddns.net/test-signals/heif/example_flower_jpeg.heif",
			"https://bevara.ddns.net/test-signals/out/heif/example_flower_jpeg.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(5000);

	it('should decode example_flower_jpeg.heif to rgb without worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_1",
			"libjpeg_1;isobmff_1",
			"https://bevara.ddns.net/test-signals/heif/example_flower_jpeg.heif",
			"https://bevara.ddns.net/test-signals/out/heif/example_flower_jpeg.png",
			done,
			"rgb",
			false,
			true
		);
	}).timeout(5000);

  it('should decode example_flower_j2k.heif to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_1",
			"openjpeg_1;isobmff_1",
			"https://bevara.ddns.net/test-signals/heif/example_flower_j2k.heif",
			"https://bevara.ddns.net/test-signals/out/heif/example_flower_j2k.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(5000);

  it('should decode example_flower_j2k.heif to rgb without worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_1",
			"openjpeg_1;isobmff_1",
			"https://bevara.ddns.net/test-signals/heif/example_flower_j2k.heif",
			"https://bevara.ddns.net/test-signals/out/heif/example_flower_j2k.png",
			done,
			"rgb",
			false,
			true
		);
	}).timeout(5000);

  it('should decode example_flower_hevc.heif to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_1",
			"ffmpeg-hevc_1;isobmff_1",
			"https://bevara.ddns.net/test-signals/heif/example_flower_hevc.heif",
			"https://bevara.ddns.net/test-signals/out/heif/example_flower_hevc.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(5000);

  it('should decode example_flower_hevc.heif to rgb without worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_1",
			"ffmpeg-hevc_1;isobmff_1",
			"https://bevara.ddns.net/test-signals/heif/example_flower_hevc.heif",
			"https://bevara.ddns.net/test-signals/out/heif/example_flower_hevc.png",
			done,
			"rgb",
			false,
			true
		);
	}).timeout(5000);
});
