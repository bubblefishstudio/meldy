import p5 from "p5"

export class SoundSynth {
	constructor() {
		this.synth = new p5.SinOsc()
		this.bpm = 120
	}

	setTempo(bpm) {
		this.bpm = bpm
	}

	playSequence(seq) {
		/**
 		  * intermediate representation: array of pairs [midi_note, relative_duration] e.g. [61, 0.25]
		  * midi_note can be `null`: in this case it will represent a rest
		  */
	}
}
