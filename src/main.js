import { MelodyGenerator } from "./core/melody/melody"
import { SoundSynth } from "./render/synth"
import { draw_score } from "./render/sheet"

// TEST MelodyGenerator
let valence = window.prompt("insert valence (0 to 1, default: 1)")
let arousal = window.prompt("insert arousal (0 to 1, default: 1)")

valence = valence !== "" ? parseFloat(valence) : 1
arousal = arousal !== "" ? parseFloat(arousal) : 1

let g = global.g = new MelodyGenerator(valence, arousal)

let m = global.m = g.gen_melody()
draw_score(m)

//m.appendNewDOM()

// TEST Synth
let p = new SoundSynth()
p.playSequence([[60, 1], [62, 1], [60, 1]])
