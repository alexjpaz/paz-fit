module.exports = function (grunt) {
    grunt.initConfig({
            concat: {
                dist: {
                    src: ['../assets/config/app.js',
                        '../assets/helper/factory.js/',
                        '../assets/helpr/enum.js/',
                        '../assets/helpr/tools.js/',
                        '../assets/config/routes.js/',
                        '../assets/components/**/*.js',
                        '../assets/screen/**/*.js',
                        ],
                                                 dest: 'dist/derp.js',
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
                js:  { files: 'js/*.js', tasks: [ 'uglify' ] },
            }
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-concat'); 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // register at least this one task
    grunt.registerTask('default', [ 'concat','uglify' ]);


};
