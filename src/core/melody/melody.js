import grades_rules from "./grades.yml"
import { Grammar } from "./grammar"
import { note, stream, pitch, interval } from "music21j/releases/music21.debug" // have to use built version because "music21j" is broken

class MelodyGenerator {

	constructor(valence, arousal) {
		this.valence = valence // 0 to 1
		this.arousal = arousal // 0 to 1
	}

	get_key() {
		return new pitch.Pitch(Math.floor(Math.random() * 12))
	}

	get_octave() {
		const range = [1,2,3,4,5]
		return range[Math.round(this.valence * (range.length-1))]
	}

	get_mode() {
		const modes = [ // sorted from darkest to brightest
			["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"],
			["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"],
			["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"],
			["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"],
			["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"],
			["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"],
			["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"],
		].map(line => line.map(invl => new interval.Interval(invl)))
		return modes[Math.round(this.valence * (modes.length-1))]
	}

	get_note(grade, duration) {
		// TODO: rests
		const mode = this.get_mode()
		let n = new note.Note()
		n.pitch = mode[grade-1].transposePitch(this.get_key())
		n.octave = this.get_octave()
		n.duration = duration
		return n
	}

	// generate a motif, shortest subdivision
	/*music21j.Stream*/ get_motif() {
		let grades = this.gen_grades_sequence(100)
		let durations = this.gen_duration_sequence(grades.length)
		let notes = grades.map((grade, idx) => this.get_note(grade, parseInt(durations[idx])))
		let s = new stream.Stream()
		for (const note of notes)
			s.append(note)
		return s
	}


	// generate a theme
	get_theme() {

	}


	/*string[]*/ gen_duration_sequence(/*int*/ N) {
		// TODO: use Grammar class
		let ruleset_dur = new Map();
		// duration sequence start with -1
		ruleset_dur.set("-1", [
			["1 ", 0.2],
			["0.5 ", 0.5],
			["0.25 ", 0.15],
			["0.125 ", 0.1],
			["0 ", 0.05]
		])

		function pick_string(rule, n) {
			// distribute rules on a line and pick
			let low = 0;
			for (let chance of rule) {
				if (n >= low && n < chance[1] + low)
					return chance[0]
				low += chance[1]
			}
			// in case probabilities don't add up precisely, return last item
			return rule[rule.length-1][0]
		}

		let out =  ""
		for (let i = 0; i < N; i++) {
			let rule = ruleset_dur.get("-1")
			let s = pick_string(rule, Math.random())
			out += s
		}
		return out.split(" ")
	}

	// generate sequence of relative grades
	/*string[]*/ gen_grades_sequence(/*int*/ N) {
		let g = new Grammar(grades_rules)
		g.set_variant(this.valence)
		return g.generate_sequence(N).split(" ")
	}

}

// TEST
let g = new MelodyGenerator(1,1)
console.log(`grades sequence: ${g.gen_grades_sequence(100)}`)
console.log(`duration sequence: ${g.gen_duration_sequence(100)}`)

global.g = g
global.m21j = import("music21j/releases/music21.debug.js")
