import os
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(
	loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__),'templates')),
	extensions=['jinja2.ext.autoescape'],
	autoescape=True)

def renderThing():
	template_values = {
			'lol': 'wut'
	}

	template = JINJA_ENVIRONMENT.get_template('cycle.html')

	print template.render(template_values)


renderThing()
