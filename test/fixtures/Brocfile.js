var Sass = require('broccoli-sass');
var PostCSS = require('broccoli-postcss');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

var css = new Sass(['scss'], 'site.scss', 'css/site.css');

css = new PostCSS(css, {
  plugins: [
    {
      module: require('autoprefixer'),
      options: { browsers: ['IE 10'] }
    }
  ]
});

var img = new Funnel('img', { destDir: 'img' });
var html = new Funnel('html');

module.exports = new MergeTrees([css, img, html]);
