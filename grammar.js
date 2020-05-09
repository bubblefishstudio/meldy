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
	["E", 0.5],
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

function generate_ruleset(valence) {

}
