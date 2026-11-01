describe('#libfaac', () => {
	// Structural test, not a byte-hash reference: the produced mp4 embeds
	// a creation_time that differs on every run (see
	// create_structural_video_test in test.js). What is checked is that
	// the audio track actually went through encfaac: an 'mp4a' sample
	// entry with an 'esds' descriptor, and no raw 'ipcm' entry - mp4mx
	// accepts PCM as-is, so without the "c=aac" constraint the audio tag
	// now sends when libfaac_1 is listed, the encoder would simply be
	// bypassed and the output would still be a valid (18 MB) mp4.
	it('should encode geminiani48.wav to AAC-LC in mp4 with worker', (done) => {
		const el = document.createElement('audio', { "is": "universal-audio_1" });
		el.setAttribute("src", TS + "wav/geminiani48.wav");
		el.setAttribute("using", "mm_solver_1.0.1");
		el.setAttribute("with", "rfpcm_1;libfaac_1;isobmff_1");
		el.setAttribute("out", "mp4");
		el.setAttribute("script-directory", "http://localhost:9876/base/build/dist/");
		el.setAttribute("use-worker", "");
		el.setAttribute("test", "");
		document.body.appendChild(el);

		el.decodingPromise
			.then(src => fetch(src))
			.then(resp => resp.arrayBuffer())
			.then(buf => {
				const bytes = new Uint8Array(buf);
				if (el.parentNode) el.parentNode.removeChild(el);
				const text = new TextDecoder('latin1').decode(bytes);
				if (!hasHandlerType(bytes, 'soun')) {
					done(new Error("Regression: no audio track (hdlr 'soun') found in the output mp4"));
					return;
				}
				if (text.indexOf('ipcm') !== -1 || text.indexOf('mp4a') === -1 || text.indexOf('esds') === -1) {
					done(new Error("Regression: audio track is not AAC (expected 'mp4a'+'esds', got ipcm=" +
						(text.indexOf('ipcm') !== -1) + " mp4a=" + (text.indexOf('mp4a') !== -1) + ")"));
					return;
				}
				// 96 s of stereo at 128 kbps: ~1.5 MB. Raw PCM would be 18 MB.
				if (buf.byteLength > 3000000) {
					done(new Error("Regression: output is " + buf.byteLength + " bytes, far above 128 kbps"));
					return;
				}
				done();
			})
			.catch(err => {
				if (el.parentNode) el.parentNode.removeChild(el);
				done(err);
			});
	}).timeout(120000);
});
