from tempfile import NamedTemporaryFile

from flask import Flask, Response, request
from flask_cors import cross_origin

from src.melody import MelodyGenerator

app = Flask(__name__)

@app.route("/")
@cross_origin(["http://localhost:8080", "https://mttbernardini.github.io/nuvola"])
def make_melody():
	valence = request.args.get("valence", default=1, type=float)
	arousal = request.args.get("arousal", default=1, type=float)
	mg = MelodyGenerator(valence, arousal)
	m = mg.gen_melody()
	with NamedTemporaryFile() as t:
		m.write("musicxml", fp=t.name)
		t.seek(0)
		return Response(t.read(), mimetype="application/vnd.recordare.musicxml")
