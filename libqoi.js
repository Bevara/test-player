describe('#libqoi', () => {
	// KNOWN BUG (found while trying to add a real reference here): this
	// decode currently fails - "No suitable filter to adapt caps between
	// pid qoi_logo.qoi in filter qoidec to filter writegen, disconnecting
	// pid!" then "exit code 1" (same failure with out="rgb" too, not
	// specific to "rgba") - qoidec's output pixel format has no
	// registered path to writegen's output (a separate, pre-existing
	// GPAC filter-graph issue, not something a reference file can paper
	// over). create_test's null-reference path only checks that
	// decodingPromise *resolves*, which it still does (with an
	// effectively empty/broken blob) even when the internal pipeline
	// errors out like this - so this test currently reports SUCCESS
	// without actually validating the decode. Left as-is rather than
	// generating a reference from broken output or silently turning this
	// green test red; needs the underlying pixel-format-adaptation bug
	// fixed first.
	it('should decode qoi_logo.qoi to rgba with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libqoi_1",
			TS + "qoi/qoi_logo.qoi",
			null,
			done,
			"rgba",
			false,
			false
		);
	}).timeout(30000);
});
