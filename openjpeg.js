
describe('#openjpeg', () => {
	it('should decode Bretagne1.j2k to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"openjpeg_1",
			TS + "j2k/Bretagne1.j2k",
			TS + "out/openjpeg/Bretagne1.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(30000);

	it('should decode Bretagne1.j2k to rgb without worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"openjpeg_1",
			TS + "j2k/Bretagne1.j2k",
			TS + "out/openjpeg/Bretagne1.png",
			done,
			"rgb",
			false,
			true
		);
	}).timeout(30000);

	it('should decode Bretagne1.j2k to png with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"openjpeg_1;libpng_1",
			TS + "j2k/Bretagne1.j2k",
			TS + "out/openjpeg/bretagne1_libpng.png",
			done,
			"png",
			false,
			false
		);
	}).timeout(30000);

	it('should decode Cevennes2.jp2 to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"openjpeg_1",
			TS + "j2k/Cevennes2.jp2",
			TS + "out/openjpeg/Cevennes2.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(30000);
});
