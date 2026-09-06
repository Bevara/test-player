describe('#libmng', () => {
	// Pixel comparison, not create_test's byte hash - see create_pixel_test in
	// test.js.
	//
	// The MNG-VLC file encapsulates a PNG datastream, so the reference is the
	// very image that was encapsulated: lossless in, lossless out, the match
	// has to be exact.
	it('should decode testcard_vlc.mng to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"libmng_1",
			TS + "MNG/testcard_vlc.mng",
			TS + "out/libmng/testcard_vlc.png",
			done,
			"rgb"
		);
	}).timeout(60000);

	// JNG carries JPEG data in a PNG-style container. The reference is the
	// pipeline's own output, not an independent decode: pulling the JDAT
	// payload out and decoding it with another JPEG implementation (Pillow,
	// libjpeg-turbo) agrees to within 5 per channel (mean 0.1) - the usual IDCT
	// rounding difference against libmng's jpeg-9e - which confirms the
	// container handling but is too close to reuse as a pixel-exact reference.
	it('should decode testcard.jng to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"libmng_1",
			TS + "MNG/testcard.jng",
			TS + "out/libmng/testcard_jng.png",
			done,
			"rgb"
		);
	}).timeout(60000);

	// The animation goes through the video path, which always ends in an
	// encoder here (UVideo.ts hardcodes "out.mp4" + ["c=avc"]), hence
	// libx264_1 in the graph - same structural limitation as libde265.js.
	// Functional test: what is checked is that the four frames come out of
	// libmng's callback-driven decode with their timing and reach the encoder.
	it('should decode animated_4frames.mng through the video path with worker', (done) => {
		create_test('video',
			'universal-video_1',
			"solver_1",
			"libmng_1;libx264_1",
			TS + "MNG/animated_4frames.mng",
			null,
			done,
			"mp4",
			false,
			false
		);
	}).timeout(120000);
});
