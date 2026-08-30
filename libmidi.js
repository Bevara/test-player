describe('#libmidi', () => {
	// Loading libmidi_1.wasm as a GPAC dynamic-library filter under
	// solver_minimal_1 (-sMAIN_MODULE=2) needed two fixes, both symbols
	// this filter's TiMidity++/DUMB code references via the GOT.mem
	// import mechanism (a separate resolution path from regular "env"
	// function imports - see solver_minimal/exports.cmake): 'stdin' and
	// 'optind'/'optarg'. Once those resolved, dlopen succeeded but this
	// filter's own init still failed with "[MIDI] Failed to chdir to
	// /libmidi_patches": the --embed-file'd GM patch set (see this
	// filter's CMakeLists.txt) needs solver_minimal to run emscripten's
	// real _emscripten_fs_load_embedded_files (writes the embedded bytes
	// into the virtual filesystem at load time), but solver_minimal had
	// a no-op C stub for that symbol instead (added only to satisfy the
	// WASM import type-check) which silently shadowed the real
	// implementation - see solver_minimal/CMakeLists.txt's
	// -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE=_emscripten_fs_load_embedded_files.
	//
	// Timeout is 120s, not the usual 30-60s: this decode renders ~46s of
	// real TiMidity++ synthesis, genuinely CPU-heavy, and running 20th in
	// the full suite (after 19 other tests' accumulated CPU/heap pressure
	// in the same tab) it can miss a 60s budget even though it completes
	// comfortably in isolation (e.g. a fresh debug.html tab).
	//
	// No reference file is wired in yet (5th create_test arg is null, so
	// this only checks that decoding completes without error/timeout, not
	// that the output audio is correct) - add one once a reference
	// test.wav is available.
	it('should decode test.mid to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_1",
			"libmidi_1",
			TS + "midi/test.mid",
      TS + "out/libmidi/test.wav",
			null,
			done,
			"wav",
			false,
			false
		);
	}).timeout(120000);
});
