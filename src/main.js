import { MelodyGenerator } from "./core/melody/melody"
import { SoundSynth } from "./render/synth"

// TEST MelodyGenerator
global.m21j = import("music21j/releases/music21.debug.js")

let valence = window.prompt("insert valence (0 to 1, default: 1)")
let arousal = window.prompt("insert arousal (0 to 1, default: 1)")

valence = valence !== "" ? parseFloat(valence) : 1
arousal = arousal !== "" ? parseFloat(arousal) : 1

let g = new MelodyGenerator(valence, arousal)
global.g = g

let m = g.gen_motif()
m.appendNewDOM()
global.m = m


// TEST Synth
let p = new SoundSynth()
p.playSequence([[60, 1], [62, 1], [60, 1]])
