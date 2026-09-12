describe('#flvdmx', () => {
	// Structural tests - see create_structural_video_test in test.js: UVideo.ts
	// hardcodes destination "out.mp4" and transcode ["c=avc"], so the video
	// goes through libx264_1 and isobmff_1 whatever it was, and what is checked
	// is that every stream comes out the other end as a track of the mp4.
	//
	// What these tests used to say, and why they could not pass. The earlier
	// version of this file ran "flvdmx_1;libx264_1" on solver_minimal_1 and
	// said the signals were H.264 with AAC. They are not: sample-videos.com's
	// FLV files are Sorenson H.263 with MP3 - the codecs Flash shipped with -
	// and nothing in that chain decodes either. The demuxer of the time only
	// knew AVC and AAC, because the libflv it wrapped is an RTMP library and
	// that is what RTMP carries; on these files it emitted nothing at all.
	//
	// The demuxer now parses FLV itself, names every codec Flash used, and
	// leaves decoding to the chain link that claims it: Sorenson H.263 to
	// ffmpeg-h26x_1, which gained that decoder for the purpose (it is a
	// variant of H.263 and adds 3 Ko to the module), AVC to h264bsd_1. MP3 and
	// AAC need no decoder on this path - mp4mx stores them as they are - and
	// the audio in the output mp4 was checked bit-identical to the source.
	//
	// Per file, against ffmpeg's own decode: sample_640x360, 400 frames of
	// 400 at 29.97 fps; the ocean sample, 1116 frames of 1116 and 1944 MP3
	// frames of 1944, 48 kHz stereo read from the MP3 header rather than the
	// 2-bit rate field of the FLV tag, which cannot say 48 kHz; the AVC/AAC
	// testcard, 100 frames of 100 at 49.3 dB through x264 and 174 AAC frames
	// with the sampling rate and channel count read from the
	// AudioSpecificConfig.
	it('should decode sample_640x360.flv (Sorenson H.263) with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"flvdmx_1;ffmpeg-h26x_1;isobmff_1;libx264_1",
			TS + "FLV/sample_640x360.flv",
			done,
			['vide']
		);
	}).timeout(180000);

	it('should decode sample_960x400_ocean_with_audio.flv (Sorenson H.263 + MP3) with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"flvdmx_1;ffmpeg-h26x_1;isobmff_1;libx264_1",
			TS + "FLV/sample_960x400_ocean_with_audio.flv",
			done,
			['vide', 'soun']
		);
	}).timeout(240000);

	it('should decode testcard_avc_aac.flv (AVC + AAC) with worker', (done) => {
		create_structural_video_test(
			"solver_1",
			"flvdmx_1;h264bsd_1;isobmff_1;libx264_1",
			TS + "FLV/testcard_avc_aac.flv",
			done,
			['vide', 'soun']
		);
	}).timeout(120000);
});
