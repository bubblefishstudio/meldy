
export class Grammar {

	constructor(gram_obj) {
		this.gram = gram_obj
		this.variant = 0
	}

	set_variant(v) {
		this.variant = v
	}

	pick_string(rule, n) {
		// distribute rules on a line and pick
		let low = 0;
		for (let chance of rule) {
			if (n >= low && n < chance[0] + low)
				return chance[1]
			low += chance[0]
		}
		// in case probabilities don't add up precisely, return last item
		return rule[rule.length-1][1]
	}

	get_starting_symb() {
		let rule = this.gram["starting"][this.variant]
		return this.pick_string(rule, Math.random())
	}

	apply_to(inp) {
		let out = ""
		let ruleset = this.gram["ruleset"][this.variant]
		for (let sym of inp.split(" ")) {
			let rule = ruleset[sym] || [["",1]]
			let s = this.pick_string(rule, Math.random())
			out += s + " "
		}
		return out.trim()
	}

	generate_sequence(size) {
		let seq = ""
		let next = this.get_starting_symb()
		while (seq.length < size) {
			next = this.apply_to(next)
			seq += next + " "
			if (next == "") break // prevent infinite loop
		}
		return seq.trim()
	}

}

