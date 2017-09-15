var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var walkSync = require('walk-sync');

function runGruntTask(taskName) {
  return function(test) {
    test.expect(2);

    var child = spawn('grunt', ['broccoli:' + taskName + ':build']);

    child.on('close', function() {
      var buildDir = path.join(__dirname, 'build', taskName);
      var destItems = walkSync(buildDir);

      test.deepEqual(destItems, [
        'css/',
        'css/site.css',
        'img/',
        'img/USDA_Broccolini.jpg',
        'index.html'
      ]);

      var builtCSS = fs.readFileSync(path.join(buildDir, 'css', 'site.css'), {
        encoding: 'utf8'
      });

      var fixtureCSS = fs.readFileSync(
        path.join(__dirname, 'fixtures', 'site.css'),
        {
          encoding: 'utf8'
        }
      );

      test.equal(builtCSS, fixtureCSS);
      test.done();
    });
  };
}

exports.withBrocfile = runGruntTask('brocfile');
exports.withDefault = runGruntTask('default');
exports.withFunction = runGruntTask('function');
