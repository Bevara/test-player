describe('#libbpg', () => {
	it('should decode photo.bpg to rgb with worker', (done) => {
		create_test('img',
			'universal-img_1',
			"solver_minimal_1",
			"libbpg_1",
			TS + "bpg/photo.bpg",
			null,
			done,
			"rgb",
			false,
			false
		);
	}).timeout(60000);
});
