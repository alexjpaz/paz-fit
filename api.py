import webapp2
import utils
import json

class TableWeekHandler(webapp2.RequestHandler):
    def get(self):
		max_weight = self.request.get('max')
		week = self.request.get('week')
		result = utils.generate_week(max_weight, week)
		return json.dumps(result)

class PlateHandler(webapp2.RequestHandler):
    def get(self):
		weight = self.request.get('weight')
		result = utils.calculate_plates(weight)
		return json.dumps(result)

app = webapp2.WSGIApplication([
	('/api/table/week', TableWeekHandler)
	('/api/plates', PlateHandler)
], debug=True)

