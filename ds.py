import webapp2
import json
import logging

from google.appengine.ext import ndb
from google.appengine.ext import ndb
from google.appengine.api import users

class JsonDocumentEncoder(json.JSONEncoder):
	def default(self, obj):
		logging.debug('apaz %s' % dir(obj))
		if hasattr(obj, 'isoformat'):
			return obj.isoformat()
		else:
			return json.JSONEncoder.default(self, obj)

class JsonDocument(ndb.Expando):
	doctype = ndb.StringProperty(required=True)
	owner = ndb.UserProperty(auto_current_user=True)
	created_date = ndb.DateTimeProperty(auto_now_add=True)
	modified_date = ndb.DateTimeProperty(auto_now_add=True)

	@classmethod
	def query_documents(cls, docid=None):
		if docid is not None:
			return cls.query(key=docid)
		else:
			return cls.query()

	def to_json(self):
		dd = self.to_dict()
		dd['_id'] = self.key.id()
		return dd

class JsonDocumentStore(webapp2.RequestHandler):
	def get(self, *args, **kwargs):

		docid = None

		if 'docid' in kwargs:
			docid = kwargs['docid']

		result_set = JsonDocument.query_documents(docid)
		result_array = [r.to_json() for r in result_set]

		self.response.headers['Content-Type'] = "application/json; charset=utf-8"
		self.response.out.write(json.dumps(result_array, cls=JsonDocumentEncoder))

	def post(self, **kwargs):
		logging.debug("current user" % (users.get_current_user()))

		jo = json.loads(self.request.body)
		jd = JsonDocument(**jo)
		jd.doctype = kwargs['doctype']
		jd.put()
		self.response.out.write(json.dumps(jo))

app = webapp2.WSGIApplication([
	webapp2.Route(r'/_ds/<doctype>', handler=JsonDocumentStore),
	webapp2.Route(r'/_ds/<doctype>/<docid>', handler=JsonDocumentStore)
	], debug=True)
