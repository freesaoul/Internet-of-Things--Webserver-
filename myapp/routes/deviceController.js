/* Get info DeviceController */

var testingFile = require('./openTestingFile.js').testingFile;

exports.readAll = function(req, res) {
	var myGate = testingFile.Gateways[req.params.GATEWAY_ID];
	if (myGate == null)
		{
			res.send('There is no Gateway ' + req.params.GATEWAY_ID + '.', 400);
			return;
		}
	var mydevices = myGate.DeviceControllers;
	if (mydevices == null)
		{
			res.send('There is no Device Controller on the Gateway ' 
				+ req.params.GATEWAY_ID + '.', 400);
			return;
		}
	res.send(mydevices);
};

exports.readOne = function(req, res) {
	var myGate = testingFile.Gateways[req.params.GATEWAY_ID];
	if (myGate == null)
		{
			res.send('There is no Gateway ' + req.params.GATEWAY_ID + '.', 400);
			return;
		}
	var mydevice = myGate.DeviceControllers[req.params.DEVICECONTROLLER_ID];
	if (mydevice == null)
		{
			res.send('There is no Device Controller ' + req.params.DEVICECONTROLLER_ID 
				+ ' on Gateway ' + req.params.GATEWAY_ID + '.', 400);
			return;
		}
	res.send(mydevice);
};