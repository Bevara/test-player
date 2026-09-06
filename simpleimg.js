describe('#simpleimg', () => {
	// Pixel comparison rather than create_test's byte hash: PNG output is not
	// byte-reproducible across runs even when the decoded image is identical
	// (see create_pixel_test in test.js).
	//
	// These decoders are written in-tree (filters/simpleimg/simpleimg.c), so
	// they were checked twice against Pillow, which also wrote the samples:
	// once natively, compiling simpleimg.c on the host, and once through the
	// full pipeline. All ten files came out pixel-identical both times, so the
	// references below are the pipeline outputs, captured as documented in
	// AGENTS.md step 7c.
	//
	// One caveat, recorded in simpleimg.c as well: XBM's bit polarity here
	// follows Pillow, where a set bit is white. No second XBM decoder was
	// available to arbitrate, and some tools read a set bit as the foreground.
	const cases = [
		['PCX/testcard_24bpp.pcx', 'pcx24', 'PCX 24-bit RLE'],
		['PCX/testcard_8bpp.pcx', 'pcx8', 'PCX 8-bit palettised'],
		['TGA/testcard_24bpp.tga', 'tga', 'TGA 24-bit uncompressed'],
		['TGA/testcard_24bpp_rle.tga', 'tgarle', 'TGA 24-bit RLE'],
		['SGI/testcard_rgb.sgi', 'sgirgb', 'SGI RGB'],
		['SGI/testcard_gray.sgi', 'sgigray', 'SGI greyscale'],
		['PNM/testcard.ppm', 'ppm', 'PPM (P6)'],
		['PNM/testcard.pgm', 'pgm', 'PGM (P5)'],
		['PNM/testcard.pbm', 'pbm', 'PBM (P4)'],
		['XBM/testcard.xbm', 'xbm', 'XBM'],
	];

	cases.forEach(([signal, ref, label]) => {
		it('should decode ' + label + ' to rgb with worker', (done) => {
			create_pixel_test(
				'img',
				'universal-img_1',
				"solver_minimal_1",
				"simpleimg_1",
				TS + signal,
				TS + "out/simpleimg/" + ref + ".png",
				done,
				"rgb"
			);
		}).timeout(60000);
	});
});
