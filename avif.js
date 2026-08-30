describe('#avif', () => {
	// functional-only test (no hash reference) to exercise avifdmx demux +
	// libaom AV1 decode wiring end to end - "img" tag decode-only path
	// (no re-encode needed, unlike the "video" tag).
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
