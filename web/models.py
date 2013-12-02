from google.appengine.ext import db

class Post(db.Model):
	title = db.StringProperty(required = True)
	content = db.TextProperty(required = True)
	when = db.DateTimeProperty(auto_now_add = True)
	author = db.UserProperty(required = True)


class Max(db.Model):
	lift = db.StringProperty(required = True)
	person = db.UserProperty(required = True)
	weight = db.FloatProperty(required = True) 
