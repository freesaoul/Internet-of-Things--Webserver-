/* Get info Gateways */

var testingFile = require('./openTestingFile.js').testingFile;

exports.readAll = function(req, res) {
	//res.send(testingFile);
	var myGate = testingFile.Gateways;
	if (myGate == null)
		{
			res.send('There is no Gateway connect to the server.', 400);
			return;
		}
	res.send(myGate);
};

exports.readOne = function(req, res) {
	var myGate = testingFile.Gateways[req.params.GATEWAY_ID];
	if (myGate == null)
		{
			res.send('There is no Gateway ' + req.params.GATEWAY_ID + '.', 400);
			return;
		}
	res.send(myGate);
};