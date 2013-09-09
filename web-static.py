import os
from flask import Flask, send_from_directory

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
STATIC_ROOT = os.path.join(PROJECT_ROOT,'src/main/webapp/')

app = Flask(__name__, static_folder=STATIC_ROOT, static_url_path='')

@app.route('/')
def hello():
    return send_from_directory(app.static_folder, 'index.html')
