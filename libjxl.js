
describe('#libjxl', () => {
  it('should decode test.jxl to png with worker', (done) => {
    create_test('img',
      'universal-img',
      "solver_1",
      "libjxl_1;libpng_1",
      "https://bevara.ddns.net/test-signals/JXL/test.jxl",
      "https://bevara.ddns.net/test-signals/out/jxl/test.png",
      done,
      "png",
      false,
      false);
  }).timeout(60000);

  it('should decode test.jxl to png without worker', (done) => {
    create_test('img',
      'universal-img',
      "solver_1",
      "libjxl_1;libpng_1",
      "https://bevara.ddns.net/test-signals/JXL/test.jxl",
      "https://bevara.ddns.net/test-signals/out/jxl/test.png",
      done,
      "png",
      false,
      true);
  }).timeout(60000);

  it('should decode test2.jxl to png with worker', (done) => {
    create_test('img',
      'universal-img',
      "solver_1",
      "libjxl_1;libpng_1",
      "https://bevara.ddns.net/test-signals/JXL/test2.jxl",
      "https://bevara.ddns.net/test-signals/out/jxl/test2.png",
      done,
      "png",
      false,
      false);
  }).timeout(60000);

  it('should decode test3.jxl to png with worker', (done) => {
    create_test('img',
      'universal-img',
      "solver_1",
      "libjxl_1;libpng_1",
      "https://bevara.ddns.net/test-signals/JXL/test3.jxl",
      "https://bevara.ddns.net/test-signals/out/jxl/test3.png",
      done,
      "png",
      false,
      false);
  }).timeout(60000);

  it('should decode red-room.jxl to png with worker', (done) => {
    create_test('img',
      'universal-img',
      "solver_1",
      "libjxl_1;libpng_1",
      "https://bevara.ddns.net/test-signals/JXL/red-room.jxl",
      "https://bevara.ddns.net/test-signals/out/jxl/red-room.png",
      done,
      "png",
      false,
      false);
  }).timeout(60000);

  it('should decode test.jxl to jpeg with worker', (done) => {
    create_test('img',
      'universal-img',
      "solver_1",
      "libjxl_1;libjpeg_1",
      "https://bevara.ddns.net/test-signals/JXL/test.jxl",
      "https://bevara.ddns.net/test-signals/out/jxl/test.jpg",
      done,
      "jpg",
      false,
      false);
  }).timeout(60000);


  it('should decode test.jxl to rgba with worker', (done) => {
    create_test('img',
      'universal-img',
      "solver_1",
      "libjxl_1",
      "https://bevara.ddns.net/test-signals/JXL/test.jxl",
      "https://bevara.ddns.net/test-signals/out/jxl/canvas.png",
      done,
      "rgba",
      false,
      false);
  }).timeout(60000);

  it('should decode test.jxl to rgba without worker', (done) => {
    create_test('img',
      'universal-img',
      "solver_1",
      "libjxl_1",
      "https://bevara.ddns.net/test-signals/JXL/test.jxl",
      "https://bevara.ddns.net/test-signals/out/jxl/canvas.png",
      done,
      "rgba",
      false,
      true);
  }).timeout(60000);

  it('should decode test.jxl to rgb with worker', (done) => {
    create_test('img',
      'universal-img',
      "solver_1",
      "libjxl_1",
      "https://bevara.ddns.net/test-signals/JXL/test.jxl",
      "https://bevara.ddns.net/test-signals/out/jxl/canvas.png",
      done,
      "rgb",
      false,
      false);
  }).timeout(60000);
});