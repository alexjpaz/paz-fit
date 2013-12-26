from google.appengine.api import namespace_manager
from google.appengine.api import users

class NamespaceAuthorizer(rest.Authorizer):

    def can_read(self, dispatcher, model):
        if(model.key().namespace() != namespace_manager.get_namespace()):
            dispatcher.not_found()

    def filter_read(self, dispatcher, models):
        return self.filter_models(models)

    def can_write(self, dispatcher, model, is_replace):
        if(model.is_saved() and (model.key().namespace() != namespace_manager.get_namespace())):
            dispatcher.not_found()

    def filter_write(self, dispatcher, models, is_replace):
        return self.filter_models(models)

    def can_delete(self, dispatcher, model_type, model_key):
        if(model_key.namespace() != namespace_manager.get_namespace()):
            dispatcher.not_found()

    def filter_models(self, models):
        cur_ns = namespace_manager.get_namespace()
        models[:] = [model for model in models if model.key().namespace() == cur_ns]
        return models
