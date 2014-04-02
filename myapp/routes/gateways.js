/* Get info Gateways */

var testingFile = require('./openTestingFile.js').testingFile;

exports.readAll = function(req, res) {
	res.send(testingFile);
};