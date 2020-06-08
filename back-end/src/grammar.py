from random import random

class Grammar:

	def __init__(self, gram_obj, variant=0):
		self.gram = gram_obj
		self.variant = variant

	@staticmethod
	def pick_string(rule, n):
		"""pick the corresponding string based on the probability `rule` where the random value is `n`"""
		low = 0
		for chance in rule:
			if n >= low and n < chance[0] + low:
				return chance[1]
			low += chance[0]
		# in case probabilities don't add up precisely, return last item
		return rule[-1][1]

	def pick_starting_symb(self):
		rule = self.gram["starting"][self.variant]
		return Grammar.pick_string(rule, random())

	def apply_to(self, inp):
		"""apply grammar once to `inp`"""
		out = []
		ruleset = self.gram["ruleset"][self.variant]
		for sym in inp:
			rule = ruleset.get(sym, [(1,"")])
			s = Grammar.pick_string(rule, random())
			out += s.split(" ")
		return out

	def generate_sequence(self, size):
		"""
		iterativetely apply grammar until reaching `size`
		or until the grammar stops producing symbols
		"""
		seq = []
		next = [self.pick_starting_symb()]
		while len(seq) < size:
			next = self.apply_to(next)
			seq += next
			if len(next) == 0:
				break # prevent infinite loop if grammar stops producing symbols
		return seq[:size]
