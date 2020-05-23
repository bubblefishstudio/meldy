import p5 from "p5"
import { Melody } from "./melody/melody.js"

class SoundSynth {
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

	playMelody(m) {
		this.bpm = m.tempo
		this.playSequence(m.sequence)
	}
}

var p = new SoundSynth()
p.playSequence([[60, 1], [62, 1], [null, 1], [60, 1]])
