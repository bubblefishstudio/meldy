import p5class from "p5"

let p5 : p5class // to be defined by user module
export function setP5instance(p5i : p5class) {
	p5 = p5i
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// BASE CLASSES

export abstract class UIElement {
	w : number = 0
	h : number = 0 // width and height
	x : number = 0
	y : number = 0 // position

	abstract draw() : void

	setSize(w : number, h : number) : UIElement {
		this.w = w
		this.h = h
		return this
	}

	setPosition(x : number, y : number) : UIElement {
		this.x = x
		this.y = y
		return this
	}

	isOver() : boolean {
		return p5.mouseX > this.x && p5.mouseX < (this.x + this.w)
		    && p5.mouseY > this.y && p5.mouseY < (this.y + this.h)
	}
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GROUP

export class UIGroup extends UIElement {
	elements : UIElement[]

	constructor() {
		super()
		this.elements = []
	}

	draw() : void {
		for (let e of this.elements)
			e.draw()
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// STACK

export enum Direction { HORIZONTAL, VERTICAL }

export class UIStack extends UIGroup {
	margin : number
	spacing : number
	dir : Direction

	constructor(m : number, s : number, d : Direction) {
		super()
		this.margin = m
		this.spacing = s
		this.dir = d
	}

	get innerW() : number {
		return this.w - 2*this.margin
	}

	get innerH() : number {
		return this.h - 2*this.margin
	}

	layout() : void {
		let curX = this.x + this.margin
		let curY = this.y + this.margin
		let maxX = 0, maxY = 0

		for (let el of this.elements) {
			el.setPosition(curX, curY)
			if (this.dir == Direction.HORIZONTAL) {
				curX += el.w + this.spacing
				maxX = curX
				maxY = Math.max(maxY, curY + el.h)
			} else {
				curY += el.h + this.spacing
				maxX = Math.max(maxX, curX + el.w)
				maxY = curY
			}
		}

		// recommpute stack size
		this.w = maxX + this.margin - this.x
		this.h = maxY + this.margin - this.y
	}

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// FLEXBOX

export class UIFlexbox extends UIStack {

	constructor(m : number, s : number, d : Direction) {
		super(m, s, d)
	}

	layout() : void {
		let elemH : number, elemW : number

		if (this.dir == Direction.HORIZONTAL) {
			elemH = this.innerH
			elemW = (this.innerW + this.spacing) / this.elements.length - this.spacing
		} else {
			elemW = this.innerW
			elemH = (this.innerH + this.spacing) / this.elements.length - this.spacing
		}

		for (let el of this.elements)
			el.setSize(elemW, elemH)

		super.layout()
	}

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SLIDERS

export class Slider2D extends UIElement {
	thumb_x : SliderValue
	thumb_y : SliderValue
	onChange? : (arg0 : UIElement) => void

	thumb_d = 30 // diameter of circle

	constructor(min_v : number, max_v : number, inertia : number, thumb_diameter : number) {
		super()
		this.thumb_x = new SliderValue(min_v, max_v, inertia)
		this.thumb_y = new SliderValue(min_v, max_v, inertia)
		this.thumb_d = thumb_diameter
	}

	setValue(new_vx : number, new_vy : number) : void {
		let changed_x = this.thumb_x.setValue(new_vx)
		let changed_y = this.thumb_y.setValue(new_vy)
		if (this.onChange && (changed_x || changed_y))
			this.onChange(this)
	}

	getValue() : [number, number] {
		return [this.thumb_x.v, this.thumb_y.v]
	}

	update() : void {
		if (this.isOver() && p5.mouseIsPressed) {
			this.setValue(this.thumb_x.position2value(p5.mouseX, this.startX, this.endX),
			              this.thumb_y.position2value(p5.mouseY, this.startY, this.endY))
		}
		this.thumb_x.update()
		this.thumb_y.update()
	}

	draw() : void {
		this.update()
		p5.noStroke()

		// Rectangle
		p5.fill(10, 30, 80)
		p5.rect(this.x, this.y, this.w, this.h)

		// Circle
		p5.fill(this.isOver ? 150 : 200)
		let xpos = this.thumb_x.value2position(this.thumb_x.drawn_v, this.startX, this.endX)
		let ypos = this.thumb_y.value2position(this.thumb_y.drawn_v, this.startY, this.endY)
		p5.ellipseMode(p5.CENTER)
		p5.ellipse(xpos, ypos, this.thumb_d, this.thumb_d)
	}

	get startX() {
		// left
		return this.x + this.thumb_d / 2
	}

	get endX() {
		// right
		return this.x + this.w - this.thumb_d / 2
	}

	get startY() {
		// down
		return this.y + this.h - this.thumb_d / 2
	}

	get endY() {
		// up
		return this.y + this.thumb_d / 2;
	}

}

class SliderValue {
	min_v : number
	max_v : number
	inertia : number

	private value : number = 0
	private drawn_value : number = 0

	constructor(min_v : number, max_v : number, inertia : number) {
		this.min_v = min_v
		this.max_v = max_v
		this.inertia = inertia
	}

	get v() {
		return this.value
	}

	set v(new_v) {
		this.setValue(new_v)
	}

	get drawn_v() {
		return this.drawn_value
	}

	setValue(new_v : number) : boolean {
		new_v = this.constrain(new_v)
		let old_v = this.value
		this.value = new_v
		return new_v != old_v
	}

	update() : void {
		this.drawn_value += (this.value - this.drawn_value) / this.inertia
	}

	position2value(pos : number, start : number, end : number) : number {
		let ratio = this.constrain((pos - start) / (end - start), 0, 1)
		return (this.max_v - this.min_v) * ratio + this.min_v
	}

	value2position(val : number, start : number, end : number) : number {
		let ratio = (val - this.min_v) / (this.max_v - this.min_v)
		return ratio * (end - start) + start
	}

	constrain(val : number, min_v = this.min_v , max_v = this.max_v) : number {
		return Math.min(Math.max(val, min_v), max_v)
	}

}
