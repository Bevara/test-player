describe('#libpoppler', () => {
	// functional-only test (no hash reference) to exercise PDF page-0
	// rendering end to end - poppler's rasterizer output isn't expected
	// to be bit-exact reproducible across builds, same rationale as the
	// other "video tag" functional-only tests in this repo.
	it('should decode TEST.pdf to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
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
