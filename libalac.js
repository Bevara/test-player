describe('#libalac', () => {
	// Byte-hash comparison (create_test with "wav"): a WAV out of this chain is
	// reproducible, unlike the PNG the image filters produce.
	//
	// Note the graph: "isobmff_1;libalac_1" on solver_1, not solver_minimal_1.
	// That is not a preference, it is a requirement: isobmff imports about
	// fifty GPAC symbols that solver_minimal_1 does not export (gf_m2ts_mux_*,
	// gf_isom_*text*, gf_sei_*, gf_sha1_*, oggpack_read...). With the minimal
	// solver the module cannot be linked, and emscripten's own
	// reportUndefinedSymbols throws while trying to report it - the failure
	// surfaces as "TypeError: Cannot read properties of undefined (reading
	// 'value')" from inside solver_minimal_1.js, which names nothing. The
	// isobmff video tests (libde265, libx264) already use solver_1 for the
	// same reason.
	//
	// Where the reference comes from: ALAC is lossless, so the decode was
	// checked against the audio that was encoded rather than against another
	// decoder - 0 differing samples out of 882000. The reference below is that
	// pipeline output, captured as documented in AGENTS.md step 7c.
	it('should decode testcard.m4a to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_1",
			"isobmff_1;libalac_1",
			TS + "ALAC/testcard.m4a",
			TS + "out/libalac/testcard.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(60000);
});
