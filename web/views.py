from web import app
from flask import render_template, jsonify
from flask import request
from decorators import login_required

import util
import json

@app.route('/table', methods = ['GET'])
def table():
	max_weight = int(request.args.get('max'))
	week = request.args.get('week')
	week = util.generate_week(max_weight,week)
	return json.dumps(week)

@app.route('/goal', methods = ['GET'])
def goal():
	max_weight = int(request.args.get('max'))
	weight = int(request.args.get('weight'))
	goal = util.goal(max_weight, weight)

	return json.dumps(goal)
