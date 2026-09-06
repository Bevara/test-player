describe('#libmpc', () => {
	// Reference captured from the pipeline, then compared with ffmpeg's mpc8
	// decoder: the two match to +/-2 per sample once ffmpeg's 481 extra frames
	// of synthesis latency at the head are accounted for (ffmpeg emits them,
	// libmpcdec does not).
	it('should decode ff-16b-2c-44100hz.mpc to wav with worker', (done) => {
		create_test('audio',
			'universal-audio_1',
			"solver_minimal_1",
			"libmpc_1",
			TS + "MPC/ff-16b-2c-44100hz.mpc",
			TS + "out/libmpc/ff-16b-2c-44100hz.wav",
			done,
			"wav",
			false,
			false
		);
	}).timeout(60000);
});
