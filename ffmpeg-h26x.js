describe('#ffmpeg-h26x', () => {
	// H.261 and H.263 are the two ITU-T video recommendations with no free
	// standalone decoder to build a filter on, so this module is ffmpeg
	// configured with --disable-everything and those two decoders alone. That
	// is what keeps it under a megabyte: the same source built for MPEG-1
	// (ffmpeg-mpeg1) weighs 5.5 MB.
	//
	// Both signals are AVI rather than elementary streams, for different
	// reasons. H.261 has no alternative - it predates every container GPAC
	// muxes, which is also why it has no GPAC codec identifier: avidmx tags
	// the pid with the fourcc itself and ff_common maps that back to
	// AV_CODEC_ID_H261. H.263 does have a reframer, rfh263, shipped in this
	// module, and a raw .263 decodes correctly through it; the container is
	// used here only because H.263 numbers its pictures with a temporal
	// reference and never says how many there are per second, so a raw stream
	// falls back to the 15 fps of the recommendation.
	//
	// 50 frames each, 352x288 (CIF). Against a native ffmpeg decode of the
	// same files: 59.4 dB for H.261, 59.5 dB for H.263, both through the full
	// chain including x264's own re-encoding.
	//
	// solver_1, not solver_minimal_1: isobmff needs about fifty GPAC symbols
	// the minimal solver does not export (see libalac.js for the detail).
	it('should decode testcard.avi (H.261) with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"avidmx_1;ffmpeg-h26x_1;isobmff_1;libx264_1",
			TS + "H261/testcard.avi",
			done,
			['vide']
		);
	}).timeout(120000);

	it('should decode testcard.avi (H.263) with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"avidmx_1;ffmpeg-h26x_1;isobmff_1;libx264_1",
			TS + "H263/testcard.avi",
			done,
			['vide']
		);
	}).timeout(120000);
});
