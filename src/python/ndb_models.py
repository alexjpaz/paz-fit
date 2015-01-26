from google.appengine.ext import ndb
from google.appengine.api import memcache

import datetime

class Post(ndb.Expando):
	modified_date = ndb.DateProperty(auto_now=True)
	creation_date = ndb.DateProperty(auto_now_add=True)
	post_date = ndb.DateProperty()
	title = ndb.StringProperty()
	content = ndb.StringProperty()
	
class Maxes(ndb.Model):
	press = ndb.IntegerProperty()
	deadlift = ndb.IntegerProperty()
	bench = ndb.IntegerProperty()
	squat = ndb.IntegerProperty()
	date = ndb.DateProperty(auto_now_add=True)
	
class PersonalRecord(ndb.Model):
	weight = ndb.IntegerProperty()
	reps = ndb.IntegerProperty()
	lift = ndb.StringProperty()
	date = ndb.DateProperty(auto_now_add=True)
	#post = ndb.ReferenceProperty(Post)

class Profile(ndb.Model):
	userid = ndb.StringProperty()
	email = ndb.StringProperty()
	config = ndb.StringProperty()

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
		self.prKey = pr.key.urlsafe()
		self.date = pr.date.strftime("%Y-%m-%d")
		self.weight = pr.weight
		self.reps = pr.reps
		self.targetReps = utils.goal(getattr(pr_max, pr.lift), pr.weight)
		self.work = utils.calculate_work(pr.weight, pr.reps)
		self.targetWork = utils.calculate_work(pr.weight, self.targetReps)
		print pr_max
		self.max = getattr(pr_max, pr.lift)
		self.maxKey = pr_max.key.urlsafe();


	def to_json(self):
		return json.dumps(self, default=lambda o: o.__dict__, sort_keys=False, indent=4)

class StatsCalculator():


	@staticmethod
	def get_log_max(pr):
		memkey = "max:%s" % (pr.date.strftime("%Y-%m-%d"))
		mx = memcache.get(memkey)
		if mx is None:
			q = Maxes.query(Maxes.date <= pr.date).order(-Maxes.date)
			mx = q.get()
			memcache.add(memkey, mx, 3600) # TODO: if the max is older cache for longer!

		return mx

	@staticmethod
	def get_stats(user_id=None):
		stats = StatsCollection()

		for lift in ['press','deadlift','bench','squat']:
			q = PersonalRecord.query(PersonalRecord.lift == lift).order(-PersonalRecord.date)
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

			for pr in q.iter():
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
		

		return stats


class DatGraph():

	@staticmethod
	def get_graph_data(user_id=None, lift=None):
		memkey = 'graph_data:%s:%s' % (user_id, lift) 
		graph_data = memcache.get(memkey)

		if graph_data is None:
			graph_data = []
			q = PersonalRecord.query(PersonalRecord.lift == lift).order(-PersonalRecord.date)

			for pr in q.iter():
				mx = Maxes.query(Maxes.date <= pr.date).order(-Maxes.date).get()
				graph_data.append(Stats(pr, mx))

			graph_data = json.dumps(graph_data, default=lambda o: o.__dict__, sort_keys=False, indent=4)
			memcache.add(memkey, graph_data, 3600)

		return graph_data





def get_profile(current_user):
	ddd = {
		"name": "DefaultProfile",
	}


	return ddd


class DataMigrator():

	@staticmethod
	def delete_all_the_things():
		qm = Maxes.query().order(-Maxes.date)

		for e in qm.iter():
			e.key.delete()

		qp = PersonalRecord.query().order(-Maxes.date)

		for e in qp.iter():
			e.key.delete()




	@staticmethod
	def import_all_the_things(data):
		transient = []

		for d in data["PersonalRecord"]:
			pr = PersonalRecord()
			pr.weight = d["weight"]
			pr.lift = d["lift"]
			pr.reps = d["reps"]
			pr.date = datetime.datetime.strptime(d["date"],"%Y-%m-%dT00:00:00.000Z").date()

			transient.append(pr)

		for d in data["Maxes"]:
			mx = Maxes()
			mx.date = datetime.datetime.strptime(d["date"],"%Y-%m-%dT00:00:00.000Z").date()
			mx.press = d["press"]
			mx.deadlift = d["deadlift"]
			mx.bench = d["bench"]
			mx.squat = d["squat"]


			transient.append(mx)

		for t in transient:
			t.put();


		return data;

	@staticmethod
	def export_all_the_things():
		qm = Maxes.query().order(-Maxes.date)

		qp = PersonalRecord.query().order(-Maxes.date)

		result = {
				"Maxes": [],
				"PersonalRecord": []
				}

		for m in qm.iter():
			result["Maxes"].append({
				"press": m.press,
				"deadlift": m.deadlift,
				"bench": m.bench,
				"squat": m.squat,
				"date": m.date.strftime("%Y-%m-%dT00:00:00.000Z")

				})

			for p in qp.iter():
				result["PersonalRecord"].append({
					"weight": p.weight,
					"reps": p.reps,
					"lift": p.lift,
					"date": p.date.strftime("%Y-%m-%dT00:00:00.000Z")
					})

				return result



