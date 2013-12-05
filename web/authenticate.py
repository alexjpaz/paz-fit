import webapp2
from google.appengine.api import users

def write_json(response, result):
	response.headers['Content-Type'] = 'application/json'
	response.write(json.dumps(result))


class SimpleAuthenticationHandler(webapp2.RequestHandler):
    def post(self):
    	user = users.get_current_user()
 
	result = {}
	
    	if user:
            self.response.headers['Content-Type'] = 'application/json'
            result = {}
            result['nickname'] = user.nickname()
        else:
      		result['redirect'] = users.create_login_url(self.request.uri)
        
        write_json(self.response, creds)
