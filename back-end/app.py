from flask import Flask
from src.melody import MelodyGenerator

app = Flask(__name__)

@app.route("/")
def make_melody():
	# TODO: receive valence and arousal from client
	mg = MelodyGenerator(1,1)
	m = mg.gen_melody()
	return m.write("musicxml")
