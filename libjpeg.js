describe('#libjpeg', () => {
  
	it('should decode Freedom.jpeg to png with worker', (done) => {
	  create_test('img',
		'universal-img',
		"solver_1",
		"libpng_1;libjpeg_1",
		"https://bevara.ddns.net/test-signals/Freedom.jpg",
		"https://bevara.ddns.net/test-signals/Freedom.png",
		done,
		"png",
		false,
		false
	  );
	}).timeout(5000);
  
	it('should decode Freedom.jpeg to png without worker', (done) => {
		create_test('img',
		  'universal-img',
		  "solver_1",
		  "libpng_1;libjpeg_1",
		  "https://bevara.ddns.net/test-signals/Freedom.jpg",
		  "https://bevara.ddns.net/test-signals/Freedom.png",
		  done,
		  "png",
		  false,
		  true
		);
	  }).timeout(5000);

	  it('should decode Freedom.jpeg to rgb with worker', (done) => {
		create_test('img',
		  'universal-img',
		  "solver_1",
		  "libpng_1;libjpeg_1",
		  "https://bevara.ddns.net/test-signals/Freedom.jpg",
		  "https://bevara.ddns.net/test-signals/out/libjpeg/Freedom-canvas.png",
		  done,
		  "rgb",
		  false,
		  false
		);
	  }).timeout(5000);

	  it('should decode Freedom.jpeg to rgba with worker', (done) => {
		create_test('img',
		  'universal-img',
		  "solver_1",
		  "libpng_1;libjpeg_1",
		  "https://bevara.ddns.net/test-signals/Freedom.jpg",
		  "https://bevara.ddns.net/test-signals/out/libjpeg/Freedom-canvas.png",
		  done,
		  "rgba",
		  false,
		  false
		);
	  }).timeout(5000);
  
});