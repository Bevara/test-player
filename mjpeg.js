describe('#mjpeg', () => {
	// Motion JPEG is a chain of filters that already existed, plus two small
	// pieces that did not:
	//
	//  - avidmx_1 parses the AVI. Its compressor-fourcc mapping had no entry
	//    for MJPG, so it fell through to gf_4cc_parse and emitted a pid whose
	//    codec id was the fourcc itself; nothing recognised that, and the JPEGs
	//    traversed the session undecoded (317 Ko in, 317 Ko out). It now maps
	//    MJPG - and AVRn, dmb1, JPGL, jpeg - to GF_CODECID_JPEG.
	//  - libjpeg_1's jpegdec was already a chain link on GF_CODECID_JPEG, so it
	//    picks the pid up unchanged: one complete JPEG per AVI chunk.
	//  - rgbyuv_1 then converts, because jpegdec hands back packed RGB and
	//    x264 takes planar YUV. Every still-image decoder in this build has the
	//    same output, so that filter is not specific to this chain.
	//
	// solver_1, not solver_minimal_1: isobmff needs about fifty GPAC symbols
	// the minimal solver does not export (see libalac.js for the detail).
	//
	// Where the numbers come from: 50 frames of 320x180 encoded by ffmpeg's
	// mjpeg encoder. The decode was checked against ffmpeg's own decoder at
	// 54.9 dB PSNR with a maximum difference of 3 - IDCT rounding between two
	// implementations of the libjpeg family. The colour conversion was checked
	// separately against ffmpeg's equivalent path (JPEG to RGB, then RGB to
	// studio-range YUV 4:2:0): 48.8 dB through the full chain including x264's
	// own re-encoding.
	//
	// Only the AVI case is tested. The same file in a MOV decodes correctly
	// but cannot be checked this way: with an MP4 source the session links the
	// decoder straight to mp4mx, which accepts raw video and writes it as
	// uncompressed, so x264 never enters the graph and the output has no AVC
	// track. That is decided when the graph resolves, from the pixel format
	// the decoder declares at configure time - before a frame has been read.
	it('should decode testcard.avi with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"avidmx_1;libjpeg_1;rgbyuv_1;isobmff_1;libx264_1",
			TS + "MJPEG/testcard.avi",
			done,
			['vide']
		);
	}).timeout(120000);
});
