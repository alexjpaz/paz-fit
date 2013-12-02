from web import app
from models import Post
from flask import render_template

@app.route('/api/posts')
def list_posts():
	posts = Post.all()
	posts = { 'hi' : 'lol'}

	return render_template('cycle.html', posts=posts)
