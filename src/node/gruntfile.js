module.exports = function (grunt) {
	grunt.initConfig({
			concat: {
				dist: {
					src: [
						'../assets/helper/factory.js',
						'../assets/resources/repository.js',
						'../assets/config/app.js',
						'../assets/resources/rest.js',
						'../assets/helper/enum.js',
						'../assets/helper/tools.js',
						'../assets/config/routes.js',
						'../assets/components/**/*.js',
						'../assets/filter/**/*.js'
						],
						dest: 'dist/app.js',
				},
				distcss: {
					src: ['../assets/**/*.css'],
					dest: 'dist/app.css',
				},
				screen: {
					src: ['../assets/screen/**/*.js',
						],
						dest: 'dist/screen.js',
				},
				lib: {
					src: ['bower_components/jquery/jquery.min.js',
						'bower_components/angular/angular.js',
						'bower_components/angular-resource/angular-resource.js',
						'bower_components/angular-route/angular-route.js',
						'bower_components/bootstrap/dist/js/bootstrap.min.js',
						'bower_components/d3/d3.min.js',
						'bower_components/angular-google-chart/ng-google-chart.js',
						'bower_components/momentjs/min/moment.min.js',
						'../assets/lib/ydn.db-iswu-core-e-qry-dev.js'
						],
						dest: 'dist/lib.js',
				},
			},

			uglify: {
				files: { 
					src: '../assets/**/.js',  // source files mask
					dest: 'assets.min/',    // destination folder
					expand: true,    // allow dynamic building
					flatten: true,   // remove all unnecessary nesting
					ext: '.min.js'   // replace .js to .min.js
				}
			},
			watch: {
				js:  { files: '../assets/**', tasks: [ 'concat' ] },
			}
	});

	// load plugins
	grunt.loadNpmTasks('grunt-contrib-concat'); 
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// register at least this one task
	grunt.registerTask('default', ['concat','uglify']);


};
