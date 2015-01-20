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

class Profile(db.Model):
	userid = db.StringProperty()
	email = db.StringProperty()
	config = db.StringProperty()

	pass


import utils

def get_stats():
	stats = {
		"latest": {},
		"best": {}
	}

	for lift in ['press','deadlift','bench','squat']:
		q = PersonalRecord.all().filter('lift =', lift).order('-date')
		pr = q.get()

		if pr is not None:
			mx = Maxes.all().filter('date <=', pr.date).order('-date')

			pr_max = mx.get().__dict__["_entity"][lift]

			stats["latest"][lift] = {
				"key": pr.key().id_or_name(),
				"date": pr.date.strftime("%Y-%m-%d"),
				"weight": pr.weight,
				"reps": pr.reps,
				"targetReps": utils.goal(pr_max, pr.weight),
				"work": utils.calculate_work(pr.weight, pr.reps),
				"max": pr_max
			}


	for lift in ['press','deadlift','bench','squat']:
		q = PersonalRecord.all().filter('lift =', lift).order('-date')


		best = {
			"entity": None,
			"work": 0,
			"targetReps": 0,
			"max": 0
		}

		print lift
		for pr in q.run():
			mx = Maxes.all().filter('date <=', pr.date).order('-date')
			pr_max = mx.get().__dict__["_entity"][lift]

			work = utils.calculate_work(pr.weight, pr.reps)

			if(best["entity"] is None or work >= best["work"]):
				best["work"] = work
				best["max"] = pr_max
				best["targetReps"] = utils.goal(pr_max, pr.weight)
				best["entity"] = pr


		if best["entity"] is not None:
			stats["best"][lift] = {
				"key": best["entity"].key().id(),
				"date": best["entity"].date.strftime("%Y-%m-%d"),
				"weight": best["entity"].weight,
				"reps": best["entity"].reps,
				"targetReps": best["targetReps"],
				"work": best["work"],
				"max": best["max"]
			}


	return stats


def get_profile(current_user):
	ddd = {
		"name": "DefaultProfile",
	}


	return ddd


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
			"date": m.date.strftime("%Y-%m-%dT00:00:00.000Z")

		})

	for p in qp.run():
		result["PersonalRecord"].append({
			"weight": p.weight,
			"reps": p.reps,
			"lift": p.lift,
			"date": p.date.strftime("%Y-%m-%dT00:00:00.000Z")
		})

	return result



