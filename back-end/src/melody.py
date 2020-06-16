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
		self.root = math.floor(random() * 12)

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
	def root(self):
		return m21.pitch.Pitch(self._root)

	@root.setter
	def root(self, k):
		m21.pitch.Pitch(k) # for testing value and raising exception if needed
		self._root = k

	@property
	def octave(self):
		return select_range(2, 5, self.arousal)

	@property
	def mode(self):
		MODES = ["locrian", "phrygian", "aeolian", "dorian", "mixolydian", "ionian", "lydian"]
		return MODES[select_range(1, len(MODES), self.valence) - 1]

	@property
	def key(self):
		k = m21.key.Key(self.root, self.mode)
		k.tonic.octave = self.octave
		return k

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
		mel.append(m21.instrument.Piano())
		mel.append(m21.tempo.MetronomeMark(number = self.tempo))
		mel.timeSignature = self.time_signature
		# TODO: OSMD has issues if using self.key directly (because of the mode?)
		mel.keySignature = m21.key.KeySignature(m21.key.pitchToSharps(self.root, self.mode))

		mot = self.gen_motif() # TODO: to change
		mel.append(mot)
		#mel.makeMeasures(inPlace=True) # bestClef=True
		mel.makeNotation()
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
		n.pitch = self.key.pitchFromDegree(grade)
		n.octave += grade // 8 # transpose octaves, cause `pitchFromDegree` doesn't do that apparently
		n.duration = m21.duration.Duration(duration)
		return n
