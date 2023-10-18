describe('solver', () => {

	it('should load all decoders', (done) => {
		create_test('img',
			'universal-img',
			"solver_1",
			"libjxl_1;libpng_1;libjpeg_1;openjpeg_1",
			"https://bevara.ddns.net/test-signals/JXL/test.jxl",
			"https://bevara.ddns.net/test-signals/out/jxl/test.png",
			done,
			"png",
			false,
			false
		);
	}).timeout(60000);
});
