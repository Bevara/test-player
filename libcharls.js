describe('#libcharls', () => {
	// Pixel comparison rather than create_test's byte hash: PNG output is not
	// byte-reproducible across runs even when the decoded image is identical
	// (see create_pixel_test in test.js).
	//
	// solver_1 and not solver_minimal_1: CharLS is C++ and needs a handful of
	// libc++ symbols (std::system_error, operator new(nothrow), ...) that only
	// the full solver exports.
	it('should decode banny_hp0.jls to rgb with worker', (done) => {
		create_pixel_test(
			'img',
			'universal-img_1',
			"solver_1",
			"libcharls_1",
			TS + "JLS/banny_hp0.jls",
			TS + "out/libcharls/banny_hp0.png",
			done,
			"rgb"
		);
	}).timeout(60000);
});
