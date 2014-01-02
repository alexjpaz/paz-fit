from google.appengine.api import namespace_manager
from google.appengine.api import users
import rest
import logging

class NamespaceAuthorizer(rest.Authorizer):

	def __get_namespace():
		return users.get_current_user().user_id()

	def can_read(self, dispatcher, model):
		if(model.key().namespace() != users.get_current_user().user_id()):
			dispatcher.not_found()

	def filter_read(self, dispatcher, models):
		cur_ns = users.get_current_user().user_id()
		models[:] = [model for model in models if (model.key().namespace() == cur_ns)]
		return models

	def can_write(self, dispatcher, model, is_replace):
		if(model.is_saved() and (model.key().namespace() != users.get_current_user().user_id())):
			dispatcher.not_found()

	def filter_write(self, dispatcher, models, is_replace):
		cur_ns = users.get_current_user().user_id()
		models[:] = [model for model in models if (not model.is_saved() or model.key().namespace() == cur_ns)]
		return models

	def can_delete(self, dispatcher, model_type, model_key):
		if(model_key.namespace() != users.get_current_user().user_id()):
			dispatcher.not_found()

