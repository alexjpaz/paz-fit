import os
import unittest
import tempfile

import web

from web import util

class WebTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, web.app.config['DATABASE'] = tempfile.mkstemp()
        web.app.config['TESTING'] = True
        self.app = web.app.test_client()
        #web.init_db()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(web.app.config['DATABASE'])

    def test_empty_db(self):
		rv = self.app.get('/api/table?week=531&max=400')
		print rv.data

class FiveThreeOneTestCase(unittest.TestCase):

    def test_calculate_plates(self):
		self.assertEqual(util.calculate_plates(275), [2.0, 0.0, 1.0, 0.0, 0.0, 0.0])

    def test_generate_week(self):
		self.assertEqual(util.generate_week(400, '531'), 
				[[0.75, 300.0, 2.0, 1.0, 0.0, 0.0, 0.0, 1.0],
				 [0.85, 340.0, 3.0, 0.0, 0.0, 1.0, 0.0, 1.0],
				 [0.95, 380.0, 3.0, 0.0, 1.0, 0.0, 1.0, 1.0]])


if __name__ == '__main__':
	unittest.main()
