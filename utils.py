import math 
from collections import OrderedDict

class Config(object):
	bar = 45
	bbb = 0.6
	plates = [45,35,25,10,5,2.5]
	week = {
		'3x5': [0.65,0.75,0.85],
		'3x3': [0.7,0.8,0.9],
		'531': [0.75,0.85,0.95],
		'DL': [0.4,0.5,0.6]
	}

config = {
	"bar": 45,
	"bbb": 0.6,
	"plates": [45,35,25,10,5,2.5],
	"week": {
		'3x5': [0.65,0.75,0.85],
		'3x3': [0.7,0.8,0.9],
		'531': [0.75,0.85,0.95],
		'DL': [0.4,0.5,0.6]
	}
}

def calculate_plates(weight=None):
	oneside = []
	number_of_plates = 0

	weight = weight - config["bar"]

	for plate in config["plates"]:
		number_of_plates = math.floor((weight / plate) / 2)
		# decrement weight
		if number_of_plates > 0 :
			weight = (weight - (number_of_plates*plate*2))



		oneside.append(number_of_plates)

	return oneside

def generate_month(maxes):
	month = OrderedDict()

	for mm in maxes:
		month[mm] = {}
		for week in config['week'].keys():
			month[mm][week] = generate_week(mm, week)

	return month

def generate_week(max_weight=0, week=None):

	rows = OrderedDict()

	for fraction in config["week"][week]:
		weight = round(max_weight*fraction / 5) * 5;
		plates = calculate_plates(weight)
		plates.insert(0,weight)
		rows[fraction] = plates

	return rows

def goal(max_weight, weight):
	return int(round(37-36*weight/(max_weight+5)));
