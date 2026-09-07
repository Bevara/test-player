describe('#libsilk', () => {
	// Byte-hash comparison (create_test with "wav"): a WAV out of this chain is
	// reproducible, unlike the PNG the image filters produce.
	//
	// Whole-file decoder on solver_minimal_1, like libilbc: a .silk file is
	// the nine bytes "#!SILK_V3" then, per packet, a 16-bit little-endian
	// length and that many bytes. Nothing else - no rate, no packet duration.
	// The duration needs no guess, because the decoder says when it has run
	// out of internal frames for the packet; the rate does, because SILK codes
	// at 8, 12 or 16 kHz internally and resamples to whatever it is asked for.
	// 24 kHz is the default, which is what the SDK's own test decoder uses and
	// what every .silk converter in the wild picks.
	//
	// Why the SILK SDK and not libopus. libopus does carry a SILK decoder, and
	// SILK is the speech half of Opus - but not this bitstream. When SILK went
	// into Opus its frame header moved into the Opus TOC byte, so libopus's
	// silk_Decode expects the caller to supply the internal sampling rate and
	// the frame count, and no longer reads them from the stream. A standalone
	// .silk file has them in the frame, where the SDK left them. Decoding this
	// very file with libopus's SILK was measured at -20 dB SNR against the
	// SDK's own decode: not a rounding difference, a different format.
	//
	// The reference is the pipeline output, captured as AGENTS.md step 7c
	// describes, after it was shown bit-exact against a natively built SILK
	// SDK decoder: 240000 samples, not one differs.
	it('should decode testcard.silk to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libsilk_1",
			TS + "SILK/testcard.silk",
			TS + "out/libsilk/testcard.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(60000);
});
