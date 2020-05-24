
export class Grammar {

	constructor(gram_obj) {
		this.gram = gram_obj
		this.variant = 0
	}

	set_variant(v) {
		this.variant = v
	}

	// grammar strings in the gram_obj are white-space-separated strings
	static /*string*/ pick_string(/*[float,string]*/ rule, /*float*/ n) {
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

	/*string*/ get_starting_symb() {
		let rule = this.gram["starting"][this.variant]
		return Grammar.pick_string(rule, Math.random())
	}

	/*string[]*/ apply_to(/*string[]*/ inp) {
		let out = []
		let ruleset = this.gram["ruleset"][this.variant]
		for (let sym of inp) {
			let rule = ruleset[sym] || [["",1]]
			let s = Grammar.pick_string(rule, Math.random())
			out = out.concat(s.split(" "))
		}
		return out
	}

	generate_sequence(size) {
		let seq = []
		let next = [this.get_starting_symb()]
		while (seq.length < size) {
			next = this.apply_to(next)
			seq = seq.concat(next)
			if (next.length == 0) break // prevent infinite loop
		}
		return seq
	}

}

