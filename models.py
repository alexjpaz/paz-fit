from google.appengine.ext import ndb
from google.appengine.ext import db

class Note(db.Expando):
	pass

class Max(db.Model):
	press = db.IntegerProperty()
	deadlift = db.IntegerProperty()
	bench = db.IntegerProperty()
	squat = db.IntegerProperty()
	user = db.UserProperty()
	
class PersonalRecord(db.Model):
	max = db.IntegerProperty()
	reps = db.IntegerProperty()
	lift = db.StringProperty()
	user = db.UserProperty()
