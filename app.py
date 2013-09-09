import os

from flask import Flask, send_from_directory
from flask.ext.sqlalchemy import SQLAlchemy


PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
STATIC_ROOT = os.path.join(PROJECT_ROOT,'src/main/webapp/')

app = Flask(__name__, static_folder=STATIC_ROOT, static_url_path='')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True)
    press = db.Column(db.Integer)
    deadlift = db.Column(db.Integer)
    bench = db.Column(db.Integer)
    squat = db.Column(db.Integer)

    def __init__(self, name, email):
        self.name = name
        self.email = email

    def __repr__(self):
        return '<Name %r>' % self.name

@app.route('/')
def hello():
    return send_from_directory(app.static_folder, 'index.html')
