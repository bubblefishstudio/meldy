import math

def select_range(low, up, ratio):
	"""select a integer value within `low` and `up` (included) based on `ratio`"""
	diff = up - low
	shift = low
	math.round(ratio * diff + shift)

def round_over(val, values):
	"""round `val` to the closest value in `values`"""
	rounded = float("infinity")
	for step in values:
		if math.abs(val - rounded) > math.abs(val - step):
			rounded = step
	return rounded
