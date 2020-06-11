import { setP5instance, Slider2D } from "./components.ts"

export default function(p5) {
	setP5instance(p5)

	let slider

	p5.setup = () => {
		p5.createCanvas(300, 300)
		slider = new Slider2D(0, 1, 2, 20)
		slider.setPosition(0,0).setSize(300,300).setValue(0.5, 0.5)
	}

	p5.draw = () => {
		slider.draw()
	}

	p5.readValue = () => {
		return slider.getValue()
	}

}
