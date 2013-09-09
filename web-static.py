import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='src/main/webapp', static_url_path='')
app.debug=True

@app.route('/')
def hello():
    return send_from_directory(app.static_folder, 'index.html')
