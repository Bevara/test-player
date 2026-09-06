describe('#libg711', () => {
	// The G.711 / G.721 / G.723 family has no container of its own, and a raw
	// stream does not say which member of it you are holding: G.723 at 24
	// kbit/s packs 3 bits per sample, G.721 4, G.723 at 40 kbit/s 5, and
	// nothing in the bytes distinguishes them. Sun's own ".au" format - the one
	// that shipped alongside this code, and what the reference material comes
	// in - says so in one header word, so that is what the filter reads.
	//
	// Five encodings, five tests: 1 mu-law, 27 A-law, 23 G.721 32 kbit/s,
	// 25 G.723 24 kbit/s, 26 G.723 40 kbit/s. Linear PCM .au files are rfpcm's
	// job and this filter refuses them.
	//
	// Where the references come from, and what was checked:
	//
	//  - mu-law and A-law were compared against ffmpeg's own decoders, which
	//    are a fully independent implementation: 0 differing samples out of
	//    80000, both laws. That comparison earned its keep - A-law came out
	//    exactly negated the first time, because the sign bit in A-law means
	//    the opposite of what it means in mu-law (1 is POSITIVE). Negated
	//    audio sounds identical; only a sample-level check finds it.
	//
	//  - the three ADPCM rates were compared against the same Sun code built
	//    natively: 0 differing samples out of 79920, all three. Against
	//    ffmpeg's separate G.726 implementation they are close but not
	//    identical, and this chain is the closer of the two to the signal that
	//    was encoded (SNR 23.4 vs 21.1 dB at 32 kbit/s, 17.6 vs 17.0 at 24,
	//    28.6 vs 8.0 at 40) - expected, since only one of the two is matched
	//    to the encoder that produced the file.
	//
	// The references below are the pipeline outputs, captured as AGENTS.md
	// step 7c describes, once those comparisons had passed.
	const cases = [
		['mu-law (encoding 1)', 'mulaw'],
		['A-law (encoding 27)', 'alaw'],
		['G.721 32 kbit/s (encoding 23)', 'g721'],
		['G.723 24 kbit/s (encoding 25)', 'g723_24'],
		['G.723 40 kbit/s (encoding 26)', 'g723_40'],
	];

	cases.forEach(([label, name]) => {
		it('should decode ' + label + ' .au to wav with worker', (done) => {
			create_test('audio',
				'universal-audio_1',
				"solver_minimal_1",
				"libg711_1",
				TS + "AU/testcard_" + name + ".au",
				TS + "out/libg711/testcard_" + name + ".wav",
				done,
				"wav",
				false,
				false
			);
		}).timeout(60000);
	});
});
