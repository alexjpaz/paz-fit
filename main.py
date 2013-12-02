from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from web import app
run_wsgi_app(app)
