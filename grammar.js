"use strict";

// TODO: refactor grammar into a class

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

function apply_grammar(inp, ruleset) {
	let out = "";
	for (let sym of inp) {
		let rule = ruleset.get(sym) || [["",1]]
		let s = pick_string(rule, Math.random())
		out += s
	}
	return out
}

function apply_grammar2(gram, variant, inp) {
	let ruleset = gram["ruleset"][variant]
	return apply_grammar(inp, ruleset)
}

function get_starting_symb(gram, variant) {
	let rule = gram["starting"][variant]
	return pick_string(rule, Math.random())
}

function load_grammar(path) {

}

// ↓↓↓ TODO: put in a separate module ↓↓↓

// generate a motif, shortest subdivision
function get_motif() {
	// call gen_duration_sequence and gen_grades_sequence
	// apply key and scale
	// spit out final notes
}


// generate a theme
function get_theme(){

}


var ruleset_dur = new Map();
// duration sequence start with -1
ruleset_dur.set("-1", [
	["1 ", 0.2],
	["0.5 ", 0.5],
	["0.25 ", 0.15],
	["0.125 ", 0.1],
	["0 ", 0.05]
])

function gen_duration_sequence(N){
	let out =  "";
	var i;
	for (i = 0; i < N; i++) {
		let rule = ruleset_dur.get("-1");
		let s = pick_string(rule, Math.random());
		out += s;
	}

	return out
}

// generate sequence of relative grades
function gen_grades_sequence(N) {
	let seq = ""
	let g = load_grammar("grades.yml")
	let next = get_starting_symb(g, 1) // TODO: change hardcoded variant
	while (seq.length < N) {
		next = apply_grammar2(g, 1, next)
		seq += next
	}
	return seq
}



