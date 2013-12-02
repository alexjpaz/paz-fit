import webapp2
import urllib2

import os
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(
	loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__),'templates')),
	extensions=['jinja2.ext.autoescape'],
	autoescape=True)


class Person(webapp2.RequestHandler):
	def get(self):
		template_values = urllib2.urlopen('https://raw.github.com/alexjpaz/ajpaz531/static/data/alexjpaz')

		template = JINJA_ENVIRONMENT.get_template('cycle.html')

		self.response.write(template.render(template_values))

		self.response.write(response.read())


application = webapp2.WSGIApplication([
	('/api/cycle', Person),
	], debug=True)
