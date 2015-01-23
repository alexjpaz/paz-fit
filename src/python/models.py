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
import json

class Expando(object):

	def to_json(self):
		return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


class StatsCollection(object):
	def __init__(self):
		self.latest = Expando()
		self.best = Expando()
		self.weight = Expando()

	def to_json(self):
		return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


class Stats(object):
	def __init__(self, pr, pr_max):
		ent_max = pr_max.__dict__["_entity"]

		self.prKey = str(pr.key())
		self.date = pr.date.strftime("%Y-%m-%d")
		self.weight = pr.weight
		self.reps = pr.reps
		self.targetReps = utils.goal(ent_max[pr.lift], pr.weight)
		self.work = utils.calculate_work(pr.weight, pr.reps)
		self.max = getattr(pr_max, pr.lift)
		self.maxKey = str(pr_max.key())


	def to_json(self):
		return json.dumps(self, default=lambda o: o.__dict__, sort_keys=False, indent=4)

class StatsCalculator():

	@staticmethod
	def get_log_max(pr):
		q = Maxes.all().filter('date <=', pr.date).order('-date')
		return q.get()

	@staticmethod
	def get_stats(user_id=None):
		stats = StatsCollection()

		for lift in ['press','deadlift','bench','squat']:
			q = PersonalRecord.all().filter('lift =', lift).order('-date')
			pr = q.get()

			best = Expando()
			best.pr = pr
			best.work = 0
			best.max = None 

			weight = Expando()
			weight.pr = pr
			weight.weight = 0
			weight.max = None

			if q.count() == 0:
				continue

			for pr in q.run():
				mx = StatsCalculator.get_log_max(pr)
				
				if not hasattr(stats.latest,lift):
					setattr(stats.latest,lift, Stats(pr, mx))

				work = utils.calculate_work(pr.weight, pr.reps)

				if work >= best.work:
					best.pr = pr
					best.work = work
					best.max = mx

				if pr.weight >= weight.weight:
					weight.pr = pr
					weight.weight = pr.weight
					weight.max = mx


			setattr(stats.weight, lift, Stats(weight.pr, weight.max))
			setattr(stats.best, lift, Stats(best.pr, best.max))
		

		print(stats.to_json())

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



