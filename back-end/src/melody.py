import math
from random import random
from os import path

import music21 as m21
from yaml import safe_load

from .grammar import Grammar
from .utils import select_range, round_over

# load grammars #
with open(path.join(path.dirname(__file__), "../data/grades.yml")) as f:
	_grades_rules = safe_load(f)

with open(path.join(path.dirname(__file__), "../data/durations.yml")) as f:
	_duration_rules = safe_load(f)
#################

class MelodyGenerator:

	def __init__(self, valence, arousal):
		self.valence = valence
		self.arousal = arousal
		self.key = math.floor(random() * 12)

	@property
	def valence(self):
		return self._valence

	@valence.setter
	def valence(self, v):
		if not (v >= 0 and v <= 1):
			raise ValueError("valence should be a value between 0 and 1")
		self._valence = v

	@property
	def arousal(self):
		return self._arousal

	@arousal.setter
	def arousal(self, a):
		if not (a >= 0 and a <= 1):
			raise ValueError("arousal should be a value between 0 and 1")
		self._arousal = a

	@property
	def key(self):
		return self._key

	@key.setter
	def key(self, k):
		self._key = m21.pitch.Pitch(k)

	@property
	def octave(self):
		return select_range(2, 5, self.arousal)

	@property
	def mode(self):
		modes = [ # sorted from darkest to brightest
			["P1", "m2", "m3", "P4", "d5", "m6", "m7", "P8"],
			["P1", "m2", "m3", "P4", "P5", "m6", "m7", "P8"],
			["P1", "M2", "m3", "P4", "P5", "m6", "m7", "P8"],
			["P1", "M2", "m3", "P4", "P5", "M6", "m7", "P8"],
			["P1", "M2", "M3", "P4", "P5", "M6", "m7", "P8"],
			["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"],
			["P1", "M2", "M3", "A4", "P5", "M6", "M7", "P8"],
		]
		picked_mode = modes[select_range(1, len(modes), self.valence) - 1]
		return [*map(m21.interval.Interval, picked_mode)]

	@property
	def time_signature(self):
		# TODO: derive from valence/arousal
		return m21.meter.TimeSignature("4/4")

	@property
	def tempo(self):
		return select_range(60, 180, self.arousal)


	def gen_motif(self):
		"""generates a motif, shortest subdivision"""
		grades = self._gen_grades_sequence(100) # TODO: change number
		durations = self._gen_duration_sequence(len(grades))
		mot = m21.stream.Stream()

		for i in range(len(grades)):
			mot.append(self._create_note(grades[i], durations[i]))

		return mot

	def gen_theme(self):
		"""generates a theme"""
		pass # TODO

	def gen_melody(self):
		"""generates final melody"""
		mel = m21.stream.Part()
		mel.tempo = self.tempo
		mel.timeSignature = self.time_signature

		mot = self.gen_motif() # TODO: to change
		mel.append(mot)
		mel.makeMeasures(inPlace=True)

		return mel


	def _gen_duration_sequence(self, n):
		a = round_over(self.arousal, [0, 0.5, 1])
		g = Grammar(_duration_rules, a)
		return [*map(float, g.generate_sequence(n))]

	def _gen_grades_sequence(self, n):
		v = round_over(self.valence, [0, 1]) # TODO: add 0.5 when done
		g = Grammar(_grades_rules, v)
		return [*map(int, g.generate_sequence(n))]

	def _create_note(self, grade, duration):
		# TODO: rests
		n = m21.note.Note()
		# set starting point
		n.pitch = self.key
		n.octave = self.octave
		# transpose to grade
		n.pitch = self.mode[grade-1].transposePitch(n.pitch)
		n.duration = duration
		return n
