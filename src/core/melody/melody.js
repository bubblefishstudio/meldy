import grades_rules from "./grades.yml"
import { Grammar } from "./grammar"
import { pitch, note } from "music21j"

class MelodyGenerator {

	constructor() {
		this.valence = 1
		this.arousal = 1
	}

	// generate a motif, shortest subdivision
	get_motif() {
		// call gen_duration_sequence and gen_grades_sequence
		// apply key and scale
		// spit out final notes
	}


	// generate a theme
	get_theme() {

	}


	gen_duration_sequence(N) {
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
		return out
	}

	// generate sequence of relative grades
	gen_grades_sequence(N) {
		let g = new Grammar(grades_rules)
		g.set_variant(this.valence)
		return g.generate_sequence(N)
	}

}

// TEST
let g = new MelodyGenerator()
console.log(`grades sequence: ${g.gen_grades_sequence(100)}`)
console.log(`duration sequence: ${g.gen_duration_sequence(100)}`)
