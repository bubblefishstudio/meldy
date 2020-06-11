import p5class from "p5"
import { setP5instance, Slider2D } from "./components.ts"

export default function(p5 : p5class) {
	setP5instance(p5)

	let slider : Slider2D;

	p5.setup = () => {
		slider = new Slider2D(0, 1, 2, 20)
		slider.setPosition(0,0).setSize(100,100)
		p5.createCanvas(100,100)
	}

	p5.draw = () => {
		slider.draw()
	}

}
