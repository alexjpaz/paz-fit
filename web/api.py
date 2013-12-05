import webapp2
import utils
import json
import logging
import jinja2 
import os

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__),'templates')),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


def write_html(response, result, templatepath):
	response.headers['Content-Type'] = 'text/html'
	template = JINJA_ENVIRONMENT.get_template(templatepath)
	template_values = {
		"table": result,
	}

	response.write(template.render(template_values))


def write_json(response, result):
	response.headers['Content-Type'] = 'application/json'
	response.write(json.dumps(result))

class TableWeekHandler(webapp2.RequestHandler):
    def get(self):
		max_weight = int(self.request.get('max'))
		week = self.request.get('week')
		result = utils.generate_week(max_weight, week)

		#write_json(self.response, result)
		write_html(self.response, result, 'month.html')

class TableMonthHandler(webapp2.RequestHandler):
    def get(self):
		maxes = [int(x) for x in self.request.get('maxes').split(",")]
		result = utils.generate_month(maxes)

		#write_json(self.response, result)
		write_html(self.response, result, 'month.html')

class PlateHandler(webapp2.RequestHandler):
    def get(self):
		weight = int(self.request.get('weight'))
		result = utils.calculate_plates(weight)

		write_json(self.response, result)

class GoalHandler(webapp2.RequestHandler):
    def get(self):
		max_weight = int(self.request.get('max'))
		weight = int(self.request.get('weight'))
		result = utils.goal(max_weight, weight)
		write_json(self.response, result)
		


app = webapp2.WSGIApplication([
	('/api/table/week', TableWeekHandler),
	('/api/table/month', TableMonthHandler),
	('/api/plates', PlateHandler),
	('/api/goal', PlateHandler)
], debug=True)

