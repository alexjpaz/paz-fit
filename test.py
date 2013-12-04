import unittest

import utils

class UtilsCase(unittest.TestCase):
	
    def test_week(self):
		month = utils.generate_month(315)
		self.assertEqual(month, 1)

def main():
    unittest.main()

if __name__ == "__main__":
    main()
