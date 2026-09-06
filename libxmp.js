describe('#libxmp', () => {
	// The reference is the pipeline's own output: a module is rendered, not
	// decoded, so there is no second implementation to compare against
	// sample for sample - libxmp's mixer is the definition of the result here.
	// It guards against regressions, not against libxmp being wrong.
	it('should decode ode2ptk.mod to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libxmp_1",
			TS + "MOD/ode2ptk.mod",
			TS + "out/libxmp/ode2ptk.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(60000);
});
