from web import app
from models import Post
from flask import render_template, jsonify
from flask import request
from decorators import login_required

import util

@app.route('/api/table', methods = ['GET'])
def calulate():
	max_weight = int(request.args.get('max'))
	week = request.args.get('week')
	week = util.generate_week(max_weight,week)
	return render_template('week.html', week=week)


@app.route('/api/posts', methods = ['GET'])
def list_posts():
	posts = Post.all()
	return render_template('cycle.html', posts=posts)

@app.route('/api/posts', methods = ['POST'])
@login_required
def new_post():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(title = form.title.data,
                    content = form.content.data,
                    author = users.get_current_user())
        post.put()
        flash('Post saved on database.')
        return redirect(url_for('list_posts'))
    return render_template('new_post.html', form=form)

