/*global module:false*/
module.exports = function(grunt) {

  var templates = [];
  grunt.file.recurse('./src/tmpl', function(abspath, rootdir, subdir, filename) {
    if (filename.substr(-11) === '.handlebars') {
      templates.push((subdir ? subdir + '/' : '') +
          filename.substr(0, filename.length - 11));
    }
  });

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    // Task configuration.
    jshint: {
      'files': ['gruntfile.js', './src/**/*.js', './test/**/*.js'],
      'options': {
        // options here to override JSHint defaults
        'globals': {
          'jQuery': true,
          'console': true,
          'module': true,
          'document': true
        }
      }
    },
    watch: {
      source: {
        files: [
          'gruntfile.js',
          './src/**/*.js',
          './src/**/*.html',
          './src/**/*.scss',
          './test/**/*.js'
        ],
        reload: true,
        tasks: ['requirejs:compile', 'sass', 'handlebars', 'jsdoc', 'index']
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: './build/'
        }
      }
    },
    requirejs: {
      options: {
        paths: {
          underscore: 'lib/underscore-min',
          jquery: 'lib/jquery-min',
          backbone: 'lib/backbone-min',
          application: 'js/application',
          router: 'js/router'
        },
        shim: {
          'backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' },
        }
      },
      compile: {
        options: {
          appDir: './src/',
          dir: './build/',
          fileExclusionRegExp: /^\.|^Gruntfile.js$|^sass|^node_modules/
        }
      }
    },
    jsdoc : {
      dist : {
        src: [ './src/js/**/*.js' ],
        options: {
          destination: 'doc'
        }
      }
    },
    'sass': {
      dist: {
        files: {
          './build/css/main.css': './src/sass/main.scss'
        }
      }
    },
    handlebars: {
      options: {
        namespace: 'Templates',
        amd: true,
        processContent: function(content) {
          return content.replace(/^[\x20\t]+/mg, '').replace(/[\x20\t]+$/mg, '')
              .replace(/^[\r\n]+/, '').replace(/[\r\n]*$/, '\n');
        },
        processName: function(path) {

          // refer to templates by the key defined in sources.tmpl
          for (var i = 0; i < templates.length; i++) {
            var name = templates[i];
            if (path.indexOf('tmpl/' + name + '.handlebars') > -1) {
              return name;
            }
          }
          return 'unknown template key';
        }
      },
      target: {
        files: handlebarsFiles('build/tmpl/', templates)
      }
    }
  });

  function handlebarsFiles(prefix, fileNames) {
    var result = {};
    fileNames.forEach(function(fileName) {
      result[prefix + fileName + '.js'] = './build/tmpl/' +
          fileName + '.handlebars';
    });
    return result;
  }

  var requirejsConfig = grunt.config('requirejs').options;
  grunt.config('requirejsConfig', requirejsConfig);

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-handlebars');


  // special task to process the index page.
  grunt.registerTask('index', 'Generate index.html depending on configuration', function() {
    var src = grunt.file.read('./src/index.html');
    grunt.file.write('./build/index.html', grunt.template.process(src));
  });

  // Default task.
  grunt.registerTask('default', ['requirejs', 'sass', 'handlebars', 'connect', 'jsdoc', 'index', 'watch']);
};
