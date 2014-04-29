/* Get info Gateways */

var testingFile = require('./openTestingFile.js').testingFile;

exports.readAll = function(req, res) {
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

exports.add = function(req, res) {
	console.log(req.body);
	console.log("body address: " + req.body.address);
	req.db.models.gateway.exists({address: req.body.address}, function(err, exists){
		if (err)
			res.send(501, err);
		else
		{
			console.log("exists: " + exists);
			if (!exists)
			{
				req.db.models.gateway.create(
				{
					address : req.body.address ? req.body.address : ""
				}, function(err, data){
					if (err)
						res.send(501, err);
					else
					{
						console.log("Gateway create");
						req.db.models.user.get(req.authUser.id, function(err, user){
							if (err)
								res.send(err);
							else
							{
								user.addGateway(data, function(err) {
									if (err)
										res.send(501, err);
									else
										res.send("Gateway attach to user: " + req.authUser.userName);
								});
							}
						});
					}
				});
			}
			else
			{
				req.db.models.gateway.find(
				{
					address : req.body.address ? req.body.address : ""
				}, function(err, data){
					if (err)
						res.send(501, err);
					else
					{
						console.log("gateway find");
						req.db.models.user.get(req.authUser.id, function(err, user){
							if (err)
								res.send(err);
							else
							{
								user.getGateway(function(err, user_gate) {
										console.log("user_gate: " + user_gate);
										console.log("test1: " + user_gate.address);
										console.log("test2: " + user_gate.address != req.body.address);

										var dif = true;
										user_gate.forEach(function(gates) {
											dif = gates.address != req.body.address;
										});
										console.log("dif: " + dif);

										if (dif == true)
										{
											user.addGateway(data, function(err) {
												if (err)
													res.send(501, err);
												else
													res.send("Gateway attach to user: " + req.authUser.userName);
											});
										}
										else
											res.send("The Gateway is already attach to the user");
								});
							}
						});
					}
				});
			}
		}
	});
};