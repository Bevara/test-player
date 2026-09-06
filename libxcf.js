describe('#libxcf', () => {
	// Pixel comparison rather than create_test's byte hash: PNG output is not
	// byte-reproducible across runs even when the decoded image is identical
	// (see create_pixel_test in test.js).
	//
	// Where the reference comes from: both XCF samples store the 192x128 centre
	// crop of Freedom.png, so the decoder is checked against the image that was
	// encoded rather than against itself. Both came out at 0 differing bytes
	// out of 73728. The references below are the pipeline outputs, captured as
	// documented in AGENTS.md step 7c.
	//
	// The third file in test_signals/XCF, gimp-2-6-file.xcf (from GIMP's own
	// app/tests/files), is deliberately not tested: the xcftools core rejects
	// it with "Wrong sized tile directory at 41E". That was reproduced by
	// compiling the same sources natively, so it is an upstream xcftools
	// limitation on that file and not a side effect of the wasm build. Note
	// that xcftools reports such a file by calling exit(), which takes the
	// whole module down - dec_xcf.c screens the file signature first so the
	// ordinary "wrong file type" case returns an error instead.
	const cases = [
		['XCF/testcard_rle.xcf', 'testcard_rle', 'RLE'],
		['XCF/testcard_uncompressed.xcf', 'testcard_uncompressed', 'uncompressed'],
	];

	cases.forEach(([signal, ref, label]) => {
		it('should decode a ' + label + ' XCF to rgb with worker', (done) => {
			create_pixel_test(
				'img',
				'universal-img_1',
				"solver_minimal_1",
				"libxcf_1",
				TS + signal,
				TS + "out/libxcf/" + ref + ".png",
				done,
				"rgb"
			);
		}).timeout(60000);
	});
});
