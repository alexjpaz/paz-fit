import webapp2
import utils
import tmpl
import json
import logging
import jinja2
import os
import datetime


import models
import ndb_models

from google.appengine.api import users
from google.appengine.api import namespace_manager
from google.appengine.api import memcache

from datetime import date

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__),'templates')),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


def write_html(response, result, templatepath):
	response.headers['Content-Type'] = 'text/html'
	template = JINJA_ENVIRONMENT.get_template(templatepath)
	template_values = {
		"table": result,
		"config": utils.config,
		"today": date.today()
	}

	response.write(template.render(template_values))


def write_json(response, result):
	response.headers['Content-Type'] = 'application/json'
	response.write(json.dumps(result))

class DerpAuthenticationHandler(webapp2.RequestHandler):
	def get(self):
		result = {}
		result['loginUrl'] = users.create_login_url(self.request.uri)
		result['logoutUrl'] = users.create_logout_url(self.request.uri)

		write_json(self.response, result)

class TableMonthHandler(webapp2.RequestHandler):
    def get(self):
		maxes = []
		for lift in ['press','deadlift','bench','squat']:
			maxes.append(int(self.request.get(lift[0])))

		result = utils.generate_month(maxes, '531')

		write_html(self.response, result, '531.html')

class GZCLTableHandler(webapp2.RequestHandler):
    def get(self):
		maxes = []
		for lift in ['press','deadlift','bench','squat']:
			maxes.append(int(self.request.get(lift[0])))

		result = utils.generate_month(maxes, 'gzcl')

		write_html(self.response, result, 'gzcl.html')

class TemplateHandler(webapp2.RequestHandler):
    def get(self, template="index"):
		self.response.headers['Content-Type'] = 'text/html'
		template = JINJA_ENVIRONMENT.get_template(template+'.html')
		template_values = {
			"request": self.request,
			"response": self.response,
			"utils": utils,
			"tmpl": tmpl
		}
		self.response.write(template.render(template_values))

class PlateHandler(webapp2.RequestHandler):
    def get(self):
		weight = int(self.request.get('weight'))
		result = utils.calculate_plates(weight, '531')

		write_json(self.response, result)

class GoalHandler(webapp2.RequestHandler):
    def get(self):
		max_weight = int(self.request.get('max'))
		weight = int(self.request.get('weight'))
		result = utils.goal(max_weight, weight)
		write_json(self.response, result)

class GoalHandler(webapp2.RequestHandler):
    def get(self):
		result = {}
		write_json(self.response, result)

class ExportHandler(webapp2.RequestHandler):
	def get(self):
		user_namespace = users.get_current_user().user_id()
		logging.info('Setting namespame to %s', user_namespace)
		namespace_manager.set_namespace(user_namespace)
		result = ndb_models.export_all_the_things()
		write_json(self.response, result);


class ProfileHandler(webapp2.RequestHandler):
	def get(self):
		user_id = users.get_current_user().user_id()
		profile = models.get_profile(user_id)
		write_json(self.response, profile)


class StatsHandler(webapp2.RequestHandler):
	def get(self):
		user_namespace = users.get_current_user().user_id()
		logging.info('Setting namespame to %s', user_namespace)
		namespace_manager.set_namespace(user_namespace)

		memkey = "stats:%s" % (user_namespace) 
		stats = memcache.get(memkey)

		if stats is None:
			stats = ndb_models.StatsCalculator.get_stats(user_namespace)
			stats = stats.to_json()
			memcache.add(memkey, stats, 3600)


		self.response.headers['Content-Type'] = 'application/json'
		self.response.write(stats)


class GraphHandler(webapp2.RequestHandler):
	def get(self):
		user_namespace = users.get_current_user().user_id()
		logging.info('Setting namespame to %s', user_namespace)
		namespace_manager.set_namespace(user_namespace)
		lift = self.request.get('lift')
		stats = ndb_models.DatGraph.get_graph_data(user_namespace, lift)

		self.response.headers['Content-Type'] = 'application/json'
		self.response.write(stats)

class EnvironmentHandler(webapp2.RequestHandler):
    def get(self):

	version_id = self.request.environ["CURRENT_VERSION_ID"].split('.')[1]
	timestamp = long(version_id)  / pow(2,28)
	buildDate = datetime.datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d %X")

	result = {
		"versionId": version_id,
		"timestamp": timestamp,
		"buildDate": buildDate,
		"GIT_COMMIT": self.request.environ["GIT_COMMIT"],
		"BUILD_ID": self.request.environ["BUILD_ID"],
	}
	write_json(self.response, result)

app = webapp2.WSGIApplication(routes=[
	('/api/authenticate', DerpAuthenticationHandler),
	('/api/export', ExportHandler),
	('/api/plates', PlateHandler),
	('/api/goal', PlateHandler),
	('/api/env', EnvironmentHandler),
	('/api/profile', ProfileHandler),
	('/api/stats', StatsHandler),
	('/api/graph', GraphHandler),
	webapp2.Route('/api/table/<template>', handler=TemplateHandler, name='home'),
	webapp2.Route(r'/api/table/', handler=TemplateHandler, name='home2'),
	webapp2.Route(r'/api/table', handler=TemplateHandler, name='home3')
], debug=True)

