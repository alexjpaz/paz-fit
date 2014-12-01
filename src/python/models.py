from google.appengine.ext import db

class Post(db.Expando):
	modified_date = db.DateProperty(auto_now=True)
	creation_date = db.DateProperty(auto_now_add=True)
	post_date = db.DateProperty()
	title = db.StringProperty()
	content = db.StringProperty()
	
class Maxes(db.Model):
	press = db.IntegerProperty()
	deadlift = db.IntegerProperty()
	bench = db.IntegerProperty()
	squat = db.IntegerProperty()
	date = db.DateProperty(auto_now_add=True)
	
class PersonalRecord(db.Model):
	weight = db.IntegerProperty()
	reps = db.IntegerProperty()
	lift = db.StringProperty()
	date = db.DateProperty(auto_now_add=True)
	#post = db.ReferenceProperty(Post)


def export_all_the_things():
	qm = Maxes.all()
	qm.order('date')

	print qm.count()

	qp = PersonalRecord.all()
	qp.order('date')

	result = {
		"Maxes": [],
		"PersonalRecord": []
	}

	for m in qm.run():
		result["Maxes"].append({
			"press": m.press,
			"deadlift": m.deadlift,
			"bench": m.bench,
			"squat": m.squat,
			"date": m.date.strftime("%Y-%m-%d")

		})

	for p in qp.run():
		result["PersonalRecord"].append({
			"weight": p.weight,
			"reps": p.reps,
			"lift": p.lift,
			"date": p.date.strftime("%Y-%m-%d")
		})

	return result



