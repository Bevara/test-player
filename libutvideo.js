describe('#libutvideo', () => {
	// Same "video" tag structure as libdavs2.js and libxevd.js: UVideo.ts
	// hardcodes destination "out.mp4" and transcode ["c=avc"], so a raw video
	// decoder always needs the encoder (libx264_1) and the mp4 muxer
	// (isobmff_1) in the graph, and the check is functional.
	//
	// Note the graph has four filters, not three. Ut Video has no container of
	// its own - it lives inside AVI - and the repository already reads AVI, so
	// this filter is a chain link rather than a whole-file decoder: avidmx_1
	// parses the AVI and, for a compressor fourcc it does not recognise, emits
	// a pid whose codec id is that fourcc verbatim (gf_4cc_parse) along with
	// the BITMAPINFOHEADER extra data. libutvideo_1 declares those fourccs
	// (ULY0/ULY2/ULY4, ULH0/ULH2/ULH4, ULRG) as its input codec ids.
	//
	// solver_1, not solver_minimal_1: isobmff needs about fifty GPAC symbols
	// the minimal solver does not export (see libalac.js for the detail).
	//
	// Where the numbers come from: the signal is 50 frames of 320x180 encoded
	// by ffmpeg's utvideo encoder. Ut Video is lossless, so ffmpeg's own
	// decoder reproduces the source YUV byte for byte - that decode is the
	// reference. The mp4 this chain produces matches it at ~64 dB PSNR, which
	// is x264's re-encoding loss and nothing else. In particular the two
	// chroma planes are not swapped: Ut Video hands YUV back in YV12 order
	// (Y then V then U) and the filter exchanges them for GF_PIXEL_YUV, and
	// getting that wrong would collapse the U and V PSNR, not leave it at 62.
	it('should decode testcard.avi with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"avidmx_1;libutvideo_1;isobmff_1;libx264_1",
			TS + "UTVIDEO/testcard.avi",
			done,
			['vide']
		);
	}).timeout(120000);
});
