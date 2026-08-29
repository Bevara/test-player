
describe('#libraw', () => {
	it('should decode RAW_SONY_A700.ARW to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libraw_1",
			TS + "raw-samples/ARW/RAW_SONY_A700.ARW",
			TS + "out/libraw/RAW_SONY_A700.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);

	it('should decode sample_canon_400d1.cr2 to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libraw_1",
			TS + "raw-samples/CR2/sample_canon_400d1.cr2",
			TS + "out/libraw/sample_canon_400d1.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);

	it('should decode RAW_LEICA_M8.DNG to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libraw_1",
			TS + "raw-samples/DNG/RAW_LEICA_M8.DNG",
			TS + "out/libraw/RAW_LEICA_M8.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);

	it('should decode RAW_NIKON_D90.NEF to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libraw_1",
			TS + "raw-samples/NEF/RAW_NIKON_D90.NEF",
			TS + "out/libraw/RAW_NIKON_D90.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);

	it('should decode RAW_PENTAX_KD10.PEF to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libraw_1",
			TS + "raw-samples/PEF/RAW_PENTAX_KD10.PEF",
			TS + "out/libraw/RAW_PENTAX_KD10.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);

	it('should decode RAW_LEICA_DIGILUX2_SRGB.RAW to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libraw_1",
			TS + "raw-samples/RAW/RAW_LEICA_DIGILUX2_SRGB.RAW",
			TS + "out/libraw/RAW_LEICA_DIGILUX2_SRGB.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);

	it('should decode RAW_PANASONIC_G1.RW2 to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libraw_1",
			TS + "raw-samples/RW2/RAW_PANASONIC_G1.RW2",
			TS + "out/libraw/RAW_PANASONIC_G1.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);
});
