import webapp2
import urllib2


class Person(webapp2.RequestHandler):
	def get(self):
		response = urllib2.urlopen('https://raw.github.com/alexjpaz/ajpaz531/static/data/alexjpaz')
		self.response.headers['Content-Type'] = 'application/json'
		self.response.write(response.read())


app = webapp2.WSGIApplication([
	('/rest/person/alexjpaz@gmail.com', Person),
	], debug=True)
