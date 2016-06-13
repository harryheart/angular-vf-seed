var argv = require( 'yargs' ).argv,
  fs = require( 'fs' ),
  path = require( 'path' ),
  gulp = require( 'gulp' ),
  gulpif = require( 'gulp-if' ),
  sass = require( 'gulp-ruby-sass' ),
  autoprefixer = require( 'gulp-autoprefixer' ),
  minifycss = require( 'gulp-clean-css' ),
  uglify = require( 'gulp-uglify' ),
  concat = require( 'gulp-concat' ),
  livereload = require( 'gulp-livereload' ),
  del = require( 'del' ),
  jshint = require( 'gulp-jshint' ),
  stylish = require( 'jshint-stylish' ),
  connect = require( 'gulp-connect' ),
  gutil = require( 'gulp-util' ),
  chalk = require( 'chalk' ),
  package = require( './package.json' ),
  Server = require( 'karma' ).Server;

var Moblor = function ( paths ) {
  var self = this;
  self.exist = false;
  self.resolvedPath = '';
  paths = paths || [];
  var resolvedPaths = [];
  paths.forEach( function ( localPath ) {
    var resolved = path.resolve( localPath );
    resolvedPaths.push( resolved );
    if ( !self.exist && fs.existsSync( resolved ) ) {
      self.exist = true;
      self.resolvedPath = resolved;
    }
  } );

  self.required = argv._[ 0 ].indexOf( ':moblor' ) > 0;
  if ( !self.exist && self.required ) {
    gutil.log( chalk.yellow( 'Warning: can not find Moblor UI in', '[ ' + resolvedPaths.join( ', ' ) + ' ]' ) );
  }
};

var config = {
  src: 'app',
  dist: 'dist',
  temp: '.temp'
};

var moblor = new Moblor( [
  '../moblor-ui',
  '../moblor-library',
  /* Add local path here contains the Moblor UI library */
] );

var building = argv._[ 0 ].indexOf( 'build' ) === 0;
var dest = building ? config.dist : config.temp;

// Clean
gulp.task( 'clean', function () {
  del.sync( [ dest ] );
} );

// Sass
gulp.task( 'styles', function () {
  sass( config.src + '/sass/main.scss', {
      style: 'expanded'
    } )
    .pipe( autoprefixer( 'last 2 version' ) )
    .pipe( gulpif( building, minifycss() ) )
    .pipe( gulp.dest( dest + '/css' ) );
} );

// Images
gulp.task( 'images', function () {
  gulp.src( config.src + '/images/*.*' )
    .pipe( gulp.dest( dest + '/images' ) );
} );

// JS
gulp.task( 'scripts', function () {
  gulp.src( config.src + '/js/**/*.js' )
    .pipe( jshint( '.jshintrc' ) )
    .pipe( jshint.reporter( stylish ) )
    .pipe( concat( 'main.js' ) )
    .pipe( gulpif( building, uglify() ) )
    .pipe( gulp.dest( dest + '/js' ) );
} );

// JSON
gulp.task( 'json', function () {
  gulp.src( config.src + '/data/**' )
    .pipe( gulp.dest( dest + '/data' ) );
} );

// HTML
gulp.task( 'html', function () {
  gulp.src( config.src + '/**/*.html' )
    .pipe( gulp.dest( dest + '/' ) );
} );

// Vendor
gulp.task( 'vendor', function () {
  var getMainFile = function ( moduleName ) {
    var main = '';
    var localFolder = './node_modules/' + moduleName + '/';
    if ( fs.existsSync( localFolder + 'bower.json' ) ) {
      var bower = require( localFolder + 'bower.json' );
      main = localFolder + bower.main;
    } else {
      var package = require( localFolder + 'package.json' );
      main = localFolder + package.main;
    }

    return main.replace( '.js', '.min.js' );
  };

  for ( var property in package.dependencies ) {
    gulp.src( getMainFile( property ) )
      .pipe( gulp.dest( dest + '/js' ) );
  }

  gulp.src( config.src + '/vendor/**' )
    .pipe( gulp.dest( dest + '/' ) );
} );

// Touch Point
gulp.task( 'touchpoint-images', function () {
  gulp.src( config.src + '/touchpoint images/*.*' )
    .pipe( gulp.dest( dest + '/touchpoint images' ) );
} );

// Watch
gulp.task( 'watch', function () {
  gulp.watch( config.src + '/data/**/*.json',         [ 'json' ] );
  gulp.watch( config.src + '/js/**/*.js',             [ 'scripts' ] );
  gulp.watch( config.src + '/sass/**/*.scss',         [ 'styles' ] );
  gulp.watch( config.src + '/**/*.html',              [ 'html' ] );

  if ( moblor.required && moblor.exist ) {
    gulp.watch( config.moblor + '/js/**/*.js',        [ 'moblor-scripts' ] );
    gulp.watch( config.moblor + '/sass/**/*.scss',    [ 'moblor-styles' ] );
    gulp.watch( config.moblor + '/fonts/**',          [ 'moblor-fonts' ] );
  }
} );

gulp.task( 'livereload', function () {
  gulp.watch( config.temp + '/**/*.*' ).on( 'change', livereload.changed );
  livereload.listen();
} );

// Connect
gulp.task( 'connect', function () {
  connect.server( {
    root: config.temp,
    port: '9000',
    livereload: true
  } );
} );

// Mobor tasks
gulp.task( 'moblor-styles', function () {
  sass( config.moblor + '/sass/moblor.scss', {
      style: 'expanded'
    } )
    .pipe( autoprefixer( 'last 2 version' ) )
    .pipe( gulpif( building, minifycss() ) )
    .pipe( gulp.dest( config.src + '/vendor/css' ) )
    .pipe( gulp.dest( dest + '/css' ) );
} );

gulp.task( 'moblor-scripts', function () {
  gulp.src( config.moblor + '/js/**/*.js' )
    .pipe( jshint( '.jshintrc' ) )
    .pipe( jshint.reporter( stylish ) )
    .pipe( concat( 'moblor.js' ) )
    .pipe( gulpif( building, uglify() ) )
    .pipe( gulp.dest( config.src + '/vendor/js' ) )
    .pipe( gulp.dest( dest + '/js' ) );
} );

gulp.task( 'moblor-fonts', function () {
  gulp.src( config.moblor + '/fonts/**' )
    .pipe( gulp.dest( config.src + '/vendor/fonts' ) )
    .pipe( gulp.dest( dest + '/fonts' ) );
} );

gulp.task( 'moblor', [ 'moblor-styles', 'moblor-scripts', 'moblor-fonts' ] );

gulp.task( 'default', [ 'styles', 'images', 'scripts', 'json', 'html', 'touchpoint-images', 'vendor' ] );

// Serve
gulp.task( 'serve', [ 'livereload', 'clean', 'default', 'connect', 'watch' ] );
gulp.task( 'serve:moblor', [ 'moblor', 'serve' ] );

// Build
gulp.task( 'build', [ 'clean', 'default' ] );
gulp.task( 'build:moblor', [ 'moblor', 'build' ] );

//Test
gulp.task( 'test', function ( done ) {
  new Server( {
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function () {
    done();
  } ).start();
} );
