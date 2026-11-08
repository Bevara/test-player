describe('#libdav2d', () => {
	// Test fonctionnel sans reference, comme libde265.js / libgif.js : UVideo.ts
	// fixe en dur la destination "out.mp4" et le transcodage ["c=avc"], donc tout
	// test video doit inclure un encodeur (libx264_1) et un multiplexeur
	// (isobmff_1, qui apporte mp4mx) quel que soit le decodeur teste. Ce qui est
	// verifie ici, c'est que les images AV2 traversent le graphe jusqu'a
	// l'encodeur.
	//
	// La conformite du decodage, elle, est verifiee hors karma et de facon
	// exacte : le meme decoupage en unites temporelles et la meme recopie de
	// plans que dec_av2.c, compiles d'un cote en natif et de l'autre en wasm
	// contre libdav2d.a, donnent une sortie YUV identique au bit pres sur les
	// 10 flux de dav2d-test-data (voir test_signals/AV2/PROVENANCE.md).
	it('should decode avm-v15.0.0-bus.352x288.l10.deltaq1.obu with worker', (done) => {
		create_test('video',
			'universal-video_1',
			"mm_solver_1.0.4",
			"libdav2d_1;isobmff_1;libx264_1",
			TS + "AV2/avm-v15.0.0-bus.352x288.l10.deltaq1.obu",
			null,
			done,
			"mp4",
			false,
			false
		);
	}).timeout(120000);

});
