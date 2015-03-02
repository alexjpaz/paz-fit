import os
import datetime

def list_templates():
	path = os.path.join(os.path.dirname(__file__), 'templates')
	templates = []

	for filename in os.listdir(path):
		f = filename.replace('.html','')
		templates.append(f)

	return templates


def today():
	return datetime.date.today()
