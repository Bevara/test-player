describe('#libpng', () => {
	it('should decode Freedom.png to jpeg with worker', (done) => {
		create_test('img',
			'universal-img',
			"solver_1",
			"libpng_1;libjpeg_1",
			"https://bevara.ddns.net/test-signals/Freedom.png",
			"https://bevara.ddns.net/test-signals/out/libpng/Freedom.jpeg",
			done,
			"jpg",
			false,
			false
		);
	}).timeout(5000);

	it('should decode Freedom.png to jpeg without worker', (done) => {
		create_test('img',
			'universal-img',
			"solver_1",
			"libpng_1;libjpeg_1",
			"https://bevara.ddns.net/test-signals/Freedom.png",
			"https://bevara.ddns.net/test-signals/out/libpng/Freedom.jpeg",
			done,
			"jpg",
			false,
			true
		);
	}).timeout(5000);

	it('should decode owl.png to jpeg with worker', (done) => {
		create_test('img',
			'universal-img',
			"solver_1",
			"libpng_1;libjpeg_1",
			"https://bevara.ddns.net/test-signals/owl.png",
			"https://bevara.ddns.net/test-signals/out/libpng/owl.jpeg",
			done,
			"jpg",
			false,
			false
		);
	}).timeout(5000);

	it('should decode owl.png to jpeg without worker', (done) => {
		create_test('img',
			'universal-img',
			"solver_1",
			"libpng_1;libjpeg_1",
			"https://bevara.ddns.net/test-signals/owl.png",
			"https://bevara.ddns.net/test-signals/out/libpng/owl.jpeg",
			done,
			"jpg",
			false,
			true
		);
	}).timeout(5000);

	it('should decode Freedom.png to rgb with worker', (done) => {
		create_test('img',
			'universal-img',
			"solver_1",
			"libpng_1;libjpeg_1",
			"https://bevara.ddns.net/test-signals/Freedom.png",
			"https://bevara.ddns.net/test-signals/out/libpng/Freedom-canvas.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(5000);

	it('should decode Freedom.png to rgba with worker', (done) => {
		create_test('img',
			'universal-img',
			"solver_1",
			"libpng_1;libjpeg_1",
			"https://bevara.ddns.net/test-signals/Freedom.png",
			"https://bevara.ddns.net/test-signals/out/libpng/Freedom-canvas.png",
			done,
			"rgba",
			false,
			false
		);
	}).timeout(5000);

	it('should decode owl.png to rgb with worker', (done) => {
		create_test('img',
			'universal-img',
			"solver_1",
			"libpng_1;libjpeg_1",
			"https://bevara.ddns.net/test-signals/owl.png",
			"https://bevara.ddns.net/test-signals/out/libpng/owl-canvas.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(5000);

	it('should decode owl.png to rgba with worker', (done) => {
		create_test('img',
			'universal-img',
			"solver_1",
			"libpng_1;libjpeg_1",
			"https://bevara.ddns.net/test-signals/owl.png",
			"https://bevara.ddns.net/test-signals/out/libpng/owl-canvas.png",
			done,
			"rgba",
			false,
			false
		);
	}).timeout(5000);

	it('should decode RedRockCanyon.png to rgba with worker', (done) => {
		create_test('img',
			'universal-img',
			"solver_1",
			"libpng_1",
			"https://bevara.ddns.net/test-signals/PNG/RedRockCanyon.png",
			"https://bevara.ddns.net/test-signals/out/libpng/RedRockCanyon.png",
			done,
			"rgba",
			false,
			false
		);
	}).timeout(10000);
});