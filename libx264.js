describe('#libx264', () => {
	// Non-regression test for the "solver_with_webcodecs_1 + libx264_1" bug
	// fixed on 2026-08-31: loader.js used to force-instantiate the "wcenc"
	// filter unconditionally (regardless of use-webcodec), so once wcenc
	// failed ("Codec/Profile not supported") the video PID was disconnected
	// with no fallback to libx264_1's encx264, leaving an audio-only mp4.
	//
	// The produced mp4 embeds a creation_time timestamp that differs on
	// every run (confirmed non-byte-reproducible: two back-to-back runs of
	// the exact same input hash differently), so this can't do a simple
	// hash comparison against a fixed reference like the other tests in
	// this suite - see the same caveat in theora.js. Instead, this parses
	// the box structure of the produced mp4 and asserts both an audio and
	// a video track are actually present (the video track is exactly what
	// silently disappeared in the regression).
	it('should transcode Big_Buck_Bunny_Trailer_400p.ogv to mp4 with both audio and video tracks', (done) => {
		let el;
		const hasHandlerType = (bytes, type) => {
			const needle = [type.charCodeAt(0), type.charCodeAt(1), type.charCodeAt(2), type.charCodeAt(3)];
			for (let i = 0; i + 3 < bytes.length; i++) {
				// look for the 'hdlr' box marker, then check its handler-type
				// field (4 bytes, after box-size/type header is already
				// consumed by the caller finding 'hdlr' itself: version(1)+
				// flags(3)+predefined(4) follow immediately after the 'hdlr' fourcc)
				if (bytes[i] === 0x68 && bytes[i + 1] === 0x64 && bytes[i + 2] === 0x6c && bytes[i + 3] === 0x72) {
					const handlerOffset = i + 4 + 8;
					if (bytes[handlerOffset] === needle[0] && bytes[handlerOffset + 1] === needle[1] &&
						bytes[handlerOffset + 2] === needle[2] && bytes[handlerOffset + 3] === needle[3]) {
						return true;
					}
				}
			}
			return false;
		};

		el = document.createElement('video', { "is": "universal-video_1" });
		el.setAttribute("src", TS + "ogv/Big_Buck_Bunny_Trailer_400p.ogv");
		el.setAttribute("using", "solver_with_webcodecs_1");
		el.setAttribute("with", "ogg_1;vorbis_1;theora_1;isobmff_1;libx264_1");
		el.setAttribute("script-directory", "http://localhost:9876/base/build/dist/");
		el.setAttribute("test", "");
		document.body.appendChild(el);

		el.decodingPromise
			.then(src => fetch(src))
			.then(resp => resp.arrayBuffer())
			.then(buf => {
				const bytes = new Uint8Array(buf);
				if (el.parentNode) el.parentNode.removeChild(el);

				if (!hasHandlerType(bytes, 'vide')) {
					done(new Error("Regression: no video track (hdlr 'vide') found in the output mp4 - solver_with_webcodecs_1 + libx264_1 dropped the video track"));
					return;
				}
				if (!hasHandlerType(bytes, 'soun')) {
					done(new Error("No audio track (hdlr 'soun') found in the output mp4"));
					return;
				}
				done();
			})
			.catch(err => {
				if (el.parentNode) el.parentNode.removeChild(el);
				done(err);
			});
	}).timeout(90000);
});
