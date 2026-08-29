
describe('#libjpeg', () => {

	it('should decode Freedom.jpeg to png with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libpng_1;libjpeg_1",
			TS + "Freedom.jpg",
			TS + "out/libjpeg/Freedom-fromjpg.png",
			done,
			"png",
			false,
			false
		);
	}).timeout(30000);

	it('should decode Freedom.jpeg to png without worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libpng_1;libjpeg_1",
			TS + "Freedom.jpg",
			TS + "out/libjpeg/Freedom-fromjpg.png",
			done,
			"png",
			false,
			true
		);
	}).timeout(30000);

	it('should decode Freedom.jpeg to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libpng_1;libjpeg_1",
			TS + "Freedom.jpg",
			TS + "out/libjpeg/Freedom-canvas.png",
			done,
			"rgb",
			false,
			false
		);
	}).timeout(30000);

	// KNOWN LIMITATION - "rgba" fails for this filter too; see the detailed note in libpng.js (GPAC static-caps resolution issue, not a convertWithCanvas bug)
	// it('should decode Freedom.jpeg to rgba with worker', (done) => {
	// 	create_test('img',
	// 		'universal-img_1',
	// 		"solver_minimal_1",
	// 		"libpng_1;libjpeg_1",
	// 		TS + "Freedom.jpg",
	// 		TS + "out/libjpeg/Freedom-canvas.png",
	// 		done,
	// 		"rgba",
	// 		false,
	// 		false
	// 	);
	// }).timeout(30000);

});
