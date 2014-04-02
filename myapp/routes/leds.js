/*Get leds info*/

var testingFile = require('./openTestingFile.js').testingFile;

exports.oneStatus = function(req, res) {
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
	var myLed = mydevice.Leds[req.params.IDLED];
	if (myLed == null)
		{
			res.send('There is no Led ' + req.params.IDLED 
				+ ' on Device Controller ' + req.params.DEVICECONTROLLER_ID 
				+ ' on Gateway ' + req.params.GATEWAY_ID + '.', 400);
			return;
		}
	res.send(myLed);
};

exports.allStatus = function(req, res) {
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
	res.send(mydevice.Leds);
};