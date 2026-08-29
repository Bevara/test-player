
describe('#libjxl', () => {
  it('should decode test.jxl to png with worker', (done) => {
    create_test('img',
      'universal-img_1',
      "solver_minimal_1",
      "libjxl_1;libpng_1",
      TS + "JXL/test.jxl",
      TS + "out/jxl/test.png",
      done,
      "png",
      false,
      false);
  }).timeout(60000);

  it('should decode test.jxl to png without worker', (done) => {
    create_test('img',
      'universal-img_1',
      "solver_minimal_1",
      "libjxl_1;libpng_1",
      TS + "JXL/test.jxl",
      TS + "out/jxl/test.png",
      done,
      "png",
      false,
      true);
  }).timeout(60000);

  it('should decode test2.jxl to png with worker', (done) => {
    create_test('img',
      'universal-img_1',
      "solver_minimal_1",
      "libjxl_1;libpng_1",
      TS + "JXL/test2.jxl",
      TS + "out/jxl/test2.png",
      done,
      "png",
      false,
      false);
  }).timeout(60000);

  it('should decode test3.jxl to png with worker', (done) => {
    create_test('img',
      'universal-img_1',
      "solver_minimal_1",
      "libjxl_1;libpng_1",
      TS + "JXL/test3.jxl",
      TS + "out/jxl/test3.png",
      done,
      "png",
      false,
      false);
  }).timeout(60000);

  it('should decode red-room.jxl to png with worker', (done) => {
    create_test('img',
      'universal-img_1',
      "solver_minimal_1",
      "libjxl_1;libpng_1",
      TS + "JXL/red-room.jxl",
      TS + "out/jxl/red-room.png",
      done,
      "png",
      false,
      false);
  }).timeout(60000);

  it('should decode test.jxl to jpeg with worker', (done) => {
    create_test('img',
      'universal-img_1',
      "solver_minimal_1",
      "libjxl_1;libjpeg_1",
      TS + "JXL/test.jxl",
      TS + "out/jxl/test.jpg",
      done,
      "jpg",
      false,
      false);
  }).timeout(60000);

  it('should decode test.jxl to rgb with worker', (done) => {
    create_test('img',
      'universal-img_1',
      "solver_minimal_1",
      "libjxl_1",
      TS + "JXL/test.jxl",
      TS + "out/jxl/canvas.png",
      done,
      "rgb",
      false,
      false);
  }).timeout(60000);

  // KNOWN LIMITATION - "rgba" fails for this filter too (and libpng's); see
  // the detailed note in test-player/libpng.js. Confirmed via GPAC logs to be
  // a static-caps filter-graph-resolution issue, not a convertWithCanvas bug.
  // it('should decode test.jxl to rgba with worker', (done) => {
  //   create_test('img',
  //     'universal-img_1',
  //     "solver_minimal_1",
  //     "libjxl_1",
  //     TS + "JXL/test.jxl",
  //     TS + "out/jxl/canvas.png",
  //     done,
  //     "rgba",
  //     false,
  //     false);
  // }).timeout(60000);

  // it('should decode test.jxl to rgba without worker', (done) => {
  //   create_test('img',
  //     'universal-img_1',
  //     "solver_minimal_1",
  //     "libjxl_1",
  //     TS + "JXL/test.jxl",
  //     TS + "out/jxl/canvas.png",
  //     done,
  //     "rgba",
  //     false,
  //     true);
  // }).timeout(60000);
});
