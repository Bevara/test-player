describe('#h264bsd', () => {
	// h264bsd was in the tree long before this test and had never produced a
	// picture: gf_filter_pid_new was commented out in configure_pid, so the
	// output pid was NULL and the H264BSD_PIC_RDY branch fetched each decoded
	// frame and dropped it. What is tested here is the rewritten filter.
	//
	// It is a link in a chain, not a whole-file reader, and that is the part
	// worth remembering. A whole-file decoder cannot announce its picture size
	// until it has parsed the stream, which is after the graph has been
	// resolved; the resolver then sees a raw video pid of unknown format,
	// finds no route to the encoder, and mp4mx takes the pid instead - the
	// same failure as the Motion JPEG 2000 case in mjpeg.js. Taking a framed
	// AVC pid from mp4dmx means the size is known at configure time and
	// encx264 links normally.
	//
	// Two h264bsd behaviours the filter has to absorb:
	//
	//  - it answers H264BSD_HDRS_RDY without consuming any bytes, meaning
	//    "call me again on the same data". Treating a zero-byte return as end
	//    of data dropped the first slice of every stream, and every picture
	//    after it then failed to reference it - 50 samples in, 0 pictures out.
	//  - pictures come out macroblock-aligned, so a 320x180 stream decodes
	//    into a 320x192 buffer and each plane has to be copied line by line.
	//
	// Only the Constrained Baseline Profile: no B pictures, no CABAC, no 8x8
	// transform. The test signal is encoded that way on purpose. All 50 frames
	// come out, at 61.7 dB PSNR against a native ffmpeg decode of the same
	// file - the difference x264's own re-encoding accounts for.
	//
	// solver_1, not solver_minimal_1: isobmff needs about fifty GPAC symbols
	// the minimal solver does not export (see libalac.js for the detail).
	it('should decode testcard.mp4 (H.264 baseline) with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"isobmff_1;h264bsd_1;libx264_1",
			TS + "H264/testcard.mp4",
			done,
			['vide']
		);
	}).timeout(120000);
});
