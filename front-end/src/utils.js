
export function select_range(low, up, ratio) {
	const diff = up - low
	const shift = low
	return Math.round(ratio * diff + shift)
}

export function round_over(val, values) {
	let rounded = Infinity;
	for (let step of values) {
		if (Math.abs(val - rounded) > Math.abs(val - step))
			rounded = step
	}
	return rounded;
}
