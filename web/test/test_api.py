import unittest
import webapp2
import logging

# from the app main.py
from web import api

class TestHandlers(unittest.TestCase):

	def test_month(self):
		request = webapp2.Request.blank('/api/table/month?p=135&d=400&b=205&s=325')
		response = request.get_response(api.app)

		self.assertEqual(response.status_int, 200)

		#logging.debug('\n'+response.body)
	
		f = open('/tmp/derp.html','w')
		f.write(response.body)
		f.close()

	def test_throwaway(self):
		maxes = []
		maxes.append([125,380,195,305])
		maxes.append([130,390,200,315])
		maxes.append([135,400,205,325])
		maxes.append([140,410,210,335])
		ii = 0
		for mm in maxes:
			url = '/api/table/month?p=%s&d=%s&b=%s&s=%s' % tuple(mm)
			request = webapp2.Request.blank(url)
			response = request.get_response(api.app)

			self.assertEqual(response.status_int, 200)

			#logging.debug('\n'+response.body)
		
			f = open('/tmp/derp______________'+repr(ii)+'.html','w')
			f.write(response.body)
			f.close()
			ii += 1
