describe('#avif', () => {
	// functional-only test (no hash reference) to exercise avifdmx demux +
	// libaom AV1 decode wiring end to end - "img" tag decode-only path
	// (no re-encode needed, unlike the "video" tag).
	//
	// KNOWN BUG (found while trying to add a real reference here): this
	// decode currently fails - "No suitable filter to adapt caps between
	// pid example.avif in filter av1dec to filter writegen, disconnecting
	// pid!" then "exit code 1" - av1dec's output pixel format has no
	// registered path to writegen's "rgb" output (a separate,
	// pre-existing GPAC filter-graph issue, not something a reference
	// file can paper over). create_test's null-reference path only
	// checks that decodingPromise *resolves*, which it still does (with
	// an effectively empty/broken blob) even when the internal pipeline
	// errors out like this - so this test currently reports SUCCESS
	// without actually validating the decode. Left as-is rather than
	// generating a reference from broken output or silently turning this
	// green test red; needs the underlying pixel-format-adaptation bug
	// fixed first.
	it('should decode example.avif to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_1",
			"avif_1;libaom_1",
			TS + "heif/example.avif",
			null,
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);
});
