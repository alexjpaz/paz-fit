from google.appengine.ext import ndb
from google.appengine.ext import db

class Note(db.Expando):
	owner = db.UserProperty()
	pass

class Max(db.Model):
	owner = db.UserProperty()
	press = db.IntegerProperty()
	deadlift = db.IntegerProperty()
	bench = db.IntegerProperty()
	squat = db.IntegerProperty()
	
class PersonalRecord(db.Model):
	owner = db.UserProperty()
	max = db.IntegerProperty()
	reps = db.IntegerProperty()
	lift = db.StringProperty()
