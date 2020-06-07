import { musicxml } from "music21j"
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay"

export function draw_score(score) {
	// target html container
	const div = document.createElement("div")
	document.body.appendChild(div)

	// render
	const xml = (new musicxml.m21ToXml.GeneralObjectExporter(score)).parse()
	global.xml = xml
	const osmd = new OpenSheetMusicDisplay(div)
	osmd.load(xml).then(() => osmd.render())
}
