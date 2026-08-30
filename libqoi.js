describe('#libqoi', () => {
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
