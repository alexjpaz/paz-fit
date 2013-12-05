import webapp2
import utils
import json
import logging

import jinja2 
import os

from google.appengine.api import users

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

def write_html(response, result, templatepath):
	response.headers['Content-Type'] = 'text/html'
	template = JINJA_ENVIRONMENT.get_template(templatepath)
	template_values = {
		"table": result,
	}
	self.response.write(template.render(template_values))


def write_json(response, result):
	response.headers['Content-Type'] = 'application/json'
	response.write(json.dumps(result))

class TableWeekHandler(webapp2.RequestHandler):
    def get(self):
		max_weight = int(self.request.get('max'))
		week = self.request.get('week')
		result = utils.generate_week(max_weight, week)

		write_json(self.response, result)
		write_html(self.response, result, 'month.html')

class TableMonthHandler(webapp2.RequestHandler):
    def get(self):
		max_weight = int(self.request.get('max'))
		result = utils.generate_month(max_weight)

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
		
class SimpleAuthenticationHandler(webapp2.RequestHandler):
    def post(self):
    	user = users.get_current_user()
 
	result = {}
	
    	if user:
            self.response.headers['Content-Type'] = 'application/json'
            result := {}
            result['nickname'] = user.nickname()
        else:
      		result['redirect'] = users.create_login_url(self.request.uri)
        
        write_json(self.response, creds)

app = webapp2.WSGIApplication([
	('/api/table/week', TableWeekHandler),
	('/api/table/month', TableMonthHandler),
	('/api/plates', PlateHandler),
	('/api/goal', PlateHandler)
], debug=True)

