var path = require('path');

process.chdir(path.resolve(__dirname, 'test/fixtures'));
module.exports = require('./test/fixtures/Brocfile');
