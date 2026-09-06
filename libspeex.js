describe('#libspeex', () => {
	// Byte-hash comparison (create_test with "wav"): unlike the PNG the image
	// filters produce, a WAV out of this chain is reproducible.
	//
	// Note the graph: "ogg_1;libspeex_1". This filter is a link in a chain, not
	// a whole-file decoder - oggdmx demuxes the .spx container and emits a
	// GF_CODECID_SPEEX pid, which speexdec consumes. Two things had to be fixed
	// in oggdmx for that to work, both in dmx_ogg.c:
	//   - Speex was missing from the switch that collects init headers, so the
	//     pid was declared with no decoder config at all;
	//   - it announced 1 init header where a Speex stream has 2 + extra_headers
	//     (the header *and* the Vorbis comment packet). With only 1, the comment
	//     packet reached the decoder as audio, and because Speex is predictive
	//     that poisoned every frame after it - 159390 of 160000 samples wrong.
	//
	// Where the reference comes from: decoding the same file with the upstream
	// speexdec, compiled natively from the same libspeex. Once aligned, not one
	// sample of the 10 s decode differs by more than 1 (mean 0.016) - that is
	// the wasm build's float rounding. The alignment offset is 143 samples:
	// this filter drops the 80-sample look-ahead, as speexdec does, but not
	// speexdec's second trim driven by the granule positions, which also removes
	// the encoder's frame-boundary padding (143 samples of head, 97 of tail).
	// See the note in dec_speex.c.
	it('should decode testcard_wb.spx to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"ogg_1;libspeex_1",
			TS + "SPX/testcard_wb.spx",
			TS + "out/libspeex/testcard_wb.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(30000);
});
