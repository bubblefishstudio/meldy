from tempfile import NamedTemporaryFile
from flask import Flask, Response
from src.melody import MelodyGenerator

app = Flask(__name__)

@app.route("/")
def make_melody():
	# TODO: receive valence and arousal from client
	mg = MelodyGenerator(1,1)
	m = mg.gen_melody()
	with NamedTemporaryFile() as t:
		m.write("musicxml", fp=t.name)
		t.seek(0)
		return Response(t.read(), mimetype="text/xml")
