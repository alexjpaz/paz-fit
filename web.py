import webapp2
import urllib2

import os
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(
	loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__),'templates')),
	extensions=['jinja2.ext.autoescape'],
	autoescape=True)

	template_values = {
		'lol': 'wut'
	}

	template = JINJA_ENVIRONMENT.get_template('cycle.html')

	print template.render(template_values)


class Person(webapp2.RequestHandler):
	def get(self):
		response = urllib2.urlopen('https://raw.github.com/alexjpaz/ajpaz531/static/data/alexjpaz')
		self.response.headers['Content-Type'] = 'application/json'
		self.response.write(response.read())


app = webapp2.WSGIApplication([
	('/api/cycle', Person),
	], debug=True)
