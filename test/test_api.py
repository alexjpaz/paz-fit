import unittest
import webapp2
import logging

# from the app main.py
from web import api

class TestHandlers(unittest.TestCase):

	def test_month(self):
		request = webapp2.Request.blank('/api/table/month?maxes=130,400,180,325')
		response = request.get_response(api.app)

		self.assertEqual(response.status_int, 200)

		logging.debug('\n'+response.body)
	
		f = open('/tmp/derp.html','w')
		f.write(response.body)
		f.close()

		self.assertEqual(response.body, 'Week')
