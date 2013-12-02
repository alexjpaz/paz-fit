import os
import unittest
import tempfile

import web

class WebTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, web.app.config['DATABASE'] = tempfile.mkstemp()
        web.app.config['TESTING'] = True
        self.app = web.app.test_client()
#        web.init_db()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(web.app.config['DATABASE'])

    def test_empty_db(self):
		rv = self.app.get('/api/posts')
		print rv.get_data()

if __name__ == '__main__':
	unittest.main()
