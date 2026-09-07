describe('#ffmpeg-g726', () => {
	// Byte-hash comparison (create_test with "wav"), whole-file decoder.
	//
	// This filter exists because reusing what was already here turned out to
	// be wrong. The repository ships Sun's public domain g72x code, through
	// libg711, and G.726 is the 1990 merge of G.721 and G.723 - so the obvious
	// move was another rate in libg711's audec. Measured on the same
	// bitstreams, against the source:
	//
	//     16 kbit/s   Sun 11.6 dB   ffmpeg 11.8 dB
	//     24 kbit/s   Sun 17.1 dB   ffmpeg 17.7 dB
	//     32 kbit/s   Sun 21.4 dB   ffmpeg 23.4 dB
	//     40 kbit/s   Sun -3.4 dB   ffmpeg 28.5 dB
	//
	// And the reverse: on a .au file coded at 40 kbit/s the Sun code gives
	// 28.6 dB and ffmpeg 8.0 dB. They are two different bitstreams above
	// 24 kbit/s, so the Sun code cannot serve as a G.726 decoder and this is
	// ffmpeg reduced to the two G.726 decoders - 264 Ko.
	//
	// solver_1, not solver_minimal_1: the module needs about twenty libc
	// symbols the minimal solver does not export - fdopen, iconv_close, the
	// long double helpers - and reportUndefinedSymbols fails the load rather
	// than saying so.
	//
	// Raw G.726 has no header at all, so the code word size, the rate and the
	// bit packing are filter options. The page cannot set them today - nothing
	// in the universal tags passes a filter argument through - so what runs
	// here is the default: 4 bits, 8 kHz, MSB first, which is the classic
	// 32 kbit/s G.726 and what ffmpeg's own .g726 muxer writes.
	//
	// The reference is the pipeline output, bit-exact against a native ffmpeg
	// decode of the same file: 80000 samples, not one differs.
	it('should decode testcard.g726 to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_1",
			"ffmpeg-g726_1",
			TS + "G726/testcard.g726",
			TS + "out/ffmpeg-g726/testcard.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(60000);
});
