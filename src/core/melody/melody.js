import { Grammar } from "./grammar"
import { note, stream, pitch, interval, meter, clef } from "music21j/releases/music21.debug" // have to use built version because "music21j" is broken

import grades_rules from "./grades.yml"
import durations_rules from "./durations.yml"

// TODO: move to a "utils.js" module
function select_range(low, up, ratio) {
	const diff = up - low
	const shift = low
	return Math.round(ratio * diff + shift)
}

function round_over(val, values) {
	let rounded = Infinity;
	for (let step of values) {
		if (Math.abs(val - rounded) > Math.abs(val - step))
			rounded = step
	}
	return rounded;
}

export class MelodyGenerator {

	constructor(valence, arousal) {
		this.valence = valence
		this.arousal = arousal
		this._key = new pitch.Pitch(Math.floor(Math.random() * 12))
	}

	get valence() {
		return this._valence
	}
	set valence(v) {
		v = Number(v)
		if (!(v >= 0 && v <= 1))
			throw new TypeError("valence should be a value between 0 and 1")
		this._valence = v
	}

	get arousal() {
		return this._arousal
	}
	set arousal(a) {
		a = Number(a)
		if (!(a >= 0 && a <= 1))
			throw new TypeError("arousal should be a value between 0 and 1")
		this._arousal = a
	}

	get key() {
		return this._key
	}
	set key(k) {
		this._key = new pitch.Pitch(k)
	}

	get octave() {
		return select_range(2, 5, this.arousal)
	}

	get mode() {
		const modes = [ // sorted from darkest to brightest
			["P1", "m2", "m3", "P4", "d5", "m6", "m7", "P8"],
			["P1", "m2", "m3", "P4", "P5", "m6", "m7", "P8"],
			["P1", "M2", "m3", "P4", "P5", "m6", "m7", "P8"],
			["P1", "M2", "m3", "P4", "P5", "M6", "m7", "P8"],
			["P1", "M2", "M3", "P4", "P5", "M6", "m7", "P8"],
			["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"],
			["P1", "M2", "M3", "A4", "P5", "M6", "M7", "P8"],
		].map(line => line.map(invl => new interval.Interval(invl)))
		return modes[Math.round(this.valence * (modes.length - 1))]
	}

	get time_signature() {
		// TODO: derive from valence/arousal
		return new meter.TimeSignature("4/4")
	}

	get tempo() {
		return select_range(60, 180, this.arousal)
	}

	create_note(grade, duration) {
		// TODO: rests
		let n = new note.Note()
		n.octave = this.octave
		n.pitch = this.mode[grade-1].transposePitch(this.key)
		n.duration = duration
		return n
	}

	// generate a motif, shortest subdivision
	/*music21j.Stream*/ gen_motif() {
		let grades = this.gen_grades_sequence(100)
		let durations = this.gen_duration_sequence(grades.length)
		let notes = grades.map((grade, idx) => this.create_note(grade, durations[idx]))
		let s = new stream.Stream()
		for (const note of notes)
			s.append(note)
		s.timeSignature = this.time_signature
		s.tempo = this.tempo
		s.clef = new clef.TrebleClef() // weird
		s.makeMeasures({inPlace: true, bestClef: true})
		return s
	}

	// generate a theme
	gen_theme() {

	}

	/*float[]*/ gen_duration_sequence(/*int*/ N) {
		//let a = round_over(this.arousal, [0, 0.5, 1])
		let a = 1
		let g = new Grammar(durations_rules, a)
		return g.generate_sequence(N).map(parseFloat)
	}

	// generate sequence of relative grades
	/*string[]*/ gen_grades_sequence(/*int*/ N) {
		//let v = round_over(this.valence, [0, 0.5, 1])
		let v = 1
		let g = new Grammar(grades_rules, v)
		return g.generate_sequence(N)
	}

}

// TEST
global.m21j = import("music21j/releases/music21.debug.js")

let valence = window.prompt("insert valence (0 to 1, default: 1)")
let arousal = window.prompt("insert arousal (0 to 1, default: 1)")

valence = valence !== "" ? parseFloat(valence) : 1
arousal = arousal !== "" ? parseFloat(arousal) : 1

let g = new MelodyGenerator(valence, arousal)
global.g = g

let m = g.gen_motif()
m.appendNewDOM()
global.m = m
