from tempfile import NamedTemporaryFile
from datetime import date
from cProfile import Profile
from os import environ

from flask import Flask, Response, request
from flask_cors import cross_origin
import music21 as m21

from src.melody import MelodyGenerator

app = Flask(__name__)

@app.route("/")
@cross_origin(["http://localhost:8080", "https://mttbernardini.github.io/nuvola"])
def make_melody():
	valence = request.args.get("valence", default=1, type=float)
	arousal = request.args.get("arousal", default=1, type=float)

	if environ.get("PROFILE", False):
		print("~~ profiling ~~")
		pr = Profile()
		pr.enable()

	mg = MelodyGenerator(valence, arousal)
	m = mg.gen_melody()

	if environ.get("PROFILE", False):
		pr.disable()
		print("~~ end profile ~~")
		pr.dump_stats("profile.perf")

	# TODO: move this where appropriate
	meta = m21.metadata.Metadata()
	meta.title = "Mood of the day" # TODO: maybe we can generate random titles
	meta.composer = "Meldy"
	meta.date = date.today().strftime("%Y/%m/%d")
	m.metadata = meta

	with NamedTemporaryFile() as t:
		m.write("musicxml", fp=t.name)
		t.seek(0)
		return Response(t.read(), mimetype="application/vnd.recordare.musicxml")
