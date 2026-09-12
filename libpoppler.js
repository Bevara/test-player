describe('#libpoppler', () => {
	// functional-only test (no hash reference) to exercise PDF page-0
	// rendering end to end - poppler's rasterizer output isn't expected
	// to be bit-exact reproducible across builds, same rationale as the
	// other "video tag" functional-only tests in this repo.
	//
	// solver_1, not solver_minimal_1: libpoppler_1 imports some sixty libc++
	// symbols (filesystem::path, random_device, recursive_mutex, ostream
	// internals) that solver_minimal no longer exports - the block that
	// carried them for this one filter was dropped, and solver_1, whose
	// MAIN_MODULE=1 exports everything, resolves them all.
	it('should decode TEST.pdf to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_1",
			"libpoppler_1",
			TS + "TEST.pdf",
			null,
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);
});
