describe('#librecoil', () => {
	// RECOIL dispatches on the file extension, so both an IFF/ILBM and a
	// Degas file are exercised - they take different paths inside the library.
	it('should decode testcard_uncompressed.iff to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"librecoil_1",
			TS + "ILBM/testcard_uncompressed.iff",
			TS + "out/librecoil/testcard_uncompressed.png",
			done,
			"rgb"
		);
	}).timeout(60000);

	it('should decode testcard.pi1 to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"librecoil_1",
			TS + "DEGAS/testcard.pi1",
			TS + "out/librecoil/testcard_pi1.png",
			done,
			"rgb"
		);
	}).timeout(60000);

	/* MSP is Microsoft Paint 1/2, not a retro-computer format, but RECOIL
	 * decodes it and nothing else in the tree does, so it was added to this
	 * filter's caps rather than given a decoder of its own - a one-word change,
	 * since RECOIL already dispatches on the file extension.
	 *
	 * Reference: the pipeline output, which came out pixel-identical to Pillow
	 * (0 differing bytes out of 196608) on the same file. */
	it('should decode testcard.msp to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_minimal_1",
			"librecoil_1",
			TS + "MSP/testcard.msp",
			TS + "out/librecoil/testcard_msp.png",
			done,
			"rgb"
		);
	}).timeout(60000);
});
