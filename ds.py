import webapp2
import json

from google.appengine.ext import db
from google.appengine.api import users

class JsonDocument(db.Model):
	doctype = db.StringProperty(required=True)
	docid = db.StringProperty(required=True)
	owner = db.UserProperty(auto_current_user=True)
	data = db.StringProperty(required=True)

	def to_json(self):
		json = {}
		json['_doctype'] = self.doctype
		json['_docid'] = self.docid
		json['_owner'] = self.owner
		json['_data'] = self.data
		return json

  
class JsonDocumentStore(webapp2.RequestHandler):
	def get(self, *args, **kwargs):
		q = db.Query(JsonDocument)
		q.filter('doctype =', kwargs["doctype"])

		if 'docid' in kwargs:
			q.filter('docid =', kwargs["docid"])
		self.response.out.write('apaz(%s)' % (kwargs))

	def post(self, **kwargs):
		jd = JsonDocument(
			doctype = kwargs['doctype'],
			docid = kwargs['docid'],
			data = self.request.body
		)
		jd.put()
		self.response.out.write('apaz(%s)' % (kwargs))

app = webapp2.WSGIApplication([
    webapp2.Route(r'/_ds/<doctype>', handler=JsonDocumentStore),
    webapp2.Route(r'/_ds/<doctype>/<docid>', handler=JsonDocumentStore)
])
