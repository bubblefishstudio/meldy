"use strict";

var ruleset = new Map()

ruleset.set("A", [
	["CD", 0.3],
	["DC", 0.7],
])

ruleset.set("C", [
	["", 1],
])

ruleset.set("D", [
	["EE", 0.6],
	["EF", 0.4],
])

ruleset.set("F", [
	["C", 0.5],
	["E", 0.4],
	["D",0.1],
])

ruleset.set("E", [
	["A", 0.5],
	["B", 0.4],
	["D",0.1]
])


function pick_string(rule, n) {
	// distribute rules on a line and pick
	let low = 0;
	for (let chance of rule) {
		if (n >= low && n < chance[1] + low)
			return chance[0]
		low += chance[1]
	}
}

function apply_grammar(inp, ruleset) {
	let out = "";
	for (let sym of inp) {
		let rule = ruleset.get(sym) || [["",1]]
		let s = pick_string(rule, Math.random())
		out += s
	}
	return out
}

// generate a motif, shortest subdivision
function get_motif(){
	// call gen_duration_sequence and gen_grades_sequence
	// apply key and scale
	// spit out final notes
}


// generate a theme
function get_theme(){
	
}


// valence
function generate_ruleset(valence) {

}





var ruleset_dur = new Map()

ruleset_dur.set("s", [
	["1", 0.3],
	["0.5", 0.7],
])

// generte duration sequence
function gen_duration_sequence(N){
	
}

// generate sequence of relative grades
function gen_grades_sequence(N){
	
}



