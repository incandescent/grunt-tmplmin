module.exports = function(grunt) {

  var minify = require('html-minifier').minify;

  grunt.registerMultiTask('tmplmin', 'Minify html templates to one file with kangax html-minifier.', function () {
    var files,
        dest,
        destContent,
        content = '',
        bodyRegex = /(<body.*?>)[\s\S]*?(<\/body>)/i,
        _ = grunt.util._;

    // check if config is valid
    if (_.isString(this.data.dest) == false) {
      grunt.fatal('Please specify the destination property (must be a string)');
    }

    if (_.isArray(this.data.src) == false && _.isString(this.data.src) == false) {
      grunt.fatal('Please specify the source property (must be a string or array)');
    }

    dest = this.data.dest;
    files = grunt.file.expand(this.data.src);

    var destContent = grunt.file.read(dest);

    _(files).each(function (filepath) {
      content += grunt.file.read(filepath);
    });

    content = minify(content, grunt.config('htmlminifier'));
    grunt.file.write(dest, destContent.replace(bodyRegex, "$1" + content + "$2"));
  });
};
