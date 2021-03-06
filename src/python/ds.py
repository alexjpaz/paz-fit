import webapp2
import rest
import models
import authorizer
import authenticator

app = webapp2.WSGIApplication([
	('/rest/.*', rest.Dispatcher)
], debug=True)

rest.Dispatcher.base_url = "/rest"
rest.Dispatcher.add_models_from_module(models)
rest.Dispatcher.enable_etags = True
rest.Dispatcher.authorizer = authorizer.NamespaceAuthorizer()
rest.Dispatcher.authenticator = authenticator.BasicAuthenticator()
