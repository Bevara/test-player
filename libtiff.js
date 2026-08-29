describe('#libtiff', () => {
	// KNOWN LIMITATION - "rgba" fails for this filter too (same static-caps
	// filter-graph-resolution issue as libpng/libjxl/libjpeg, see the detailed
	// note in test-player/libpng.js). Using "rgb" instead, which matches the
	// decoder's default output format.
	it('should decode CCITT_1.TIF to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libtiff_1",
			TS + "CCITT_1.TIF",
			TS + "out/libtiff/CCITT_1.rgb",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);

	it('should decode G4.TIF to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libtiff_1",
			TS + "G4.TIF",
			TS + "out/libtiff/G4.rgb",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);

	it('should decode G32D.TIF to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libtiff_1",
			TS + "G32D.TIF",
			TS + "out/libtiff/G32D.rgb",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);

	it('should decode FLAG_T24.TIF to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libtiff_1",
			TS + "FLAG_T24.TIF",
			TS + "out/libtiff/FLAG_T24.rgb",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);

	it('should decode XING_T24.TIF to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libtiff_1",
			TS + "XING_T24.TIF",
			TS + "out/libtiff/XING_T24.rgb",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);
});
