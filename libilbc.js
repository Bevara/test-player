describe('#libilbc', () => {
	// Byte-hash comparison (create_test with "wav"): a WAV out of this chain is
	// reproducible, unlike the PNG the image filters produce.
	//
	// Whole-file decoder on solver_minimal_1: iLBC has no container beyond the
	// nine-byte "#!iLBC20\n" / "#!iLBC30\n" header that names the mode, and the
	// filter reads that rather than guessing - 38 and 50 bytes divide too many
	// stream lengths for a guess to be safe.
	//
	// Where the reference comes from. iLBC is fixed-point, so the decisive
	// check is against the same library built natively: not one sample of
	// 80160 differs. That is what this reference is - the pipeline output,
	// captured as AGENTS.md step 7c describes, after it was shown identical to
	// the native decode.
	//
	// ffmpeg's own iLBC decoder was used as the second implementation and it
	// corroborates the content but not the samples: it correlates with the
	// source at 0.775 where this chain correlates at 0.773, but it aligns 40
	// samples (5 ms) earlier - WebRTC's enhancer look-ahead, which ffmpeg
	// compensates for and libilbc does not - and it puts 113 full-scale spikes
	// into a signal that never approaches full scale. Two independent
	// implementations of a lossy codec, so this is corroboration rather than a
	// sample-level reference.
	it('should decode testcard.lbc to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libilbc_1",
			TS + "ILBC/testcard.lbc",
			TS + "out/libilbc/testcard.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(60000);
});
