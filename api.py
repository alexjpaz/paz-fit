import webapp2
import utils
import json
import logging

class TableWeekHandler(webapp2.RequestHandler):
    def get(self):
		max_weight = int(self.request.get('max'))
		week = self.request.get('week')
		result = utils.generate_week(max_weight, week)

		self.response.headers['Content-Type'] = 'application/json'
		self.response.write(json.dumps(result))

class TableMonthHandler(webapp2.RequestHandler):
    def get(self):
		max_weight = int(self.request.get('max'))
		result = utils.generate_month(max_weight)

		self.response.headers['Content-Type'] = 'application/json'
		self.response.write(json.dumps(result))

class PlateHandler(webapp2.RequestHandler):
    def get(self):
		weight = int(self.request.get('weight'))
		result = utils.calculate_plates(weight)

		self.response.headers['Content-Type'] = 'application/json'
		self.response.write(json.dumps(result))

class GoalHandler(webapp2.RequestHandler):
    def get(self):
		max_weight = int(self.request.get('max'))
		weight = int(self.request.get('weight'))
		result = utils.goal(max_weight, weight)

		self.response.headers['Content-Type'] = 'application/json'
		self.response.write(json.dumps(result))

app = webapp2.WSGIApplication([
	('/api/table/week', TableWeekHandler),
	('/api/table/month', TableMonthHandler),
	('/api/plates', PlateHandler),
	('/api/goal', PlateHandler)
], debug=True)

