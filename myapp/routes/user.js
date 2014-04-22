/* GET users listing. */
exports.list = function(req, res){
  res.send('respond with a resource');
};

exports.create = function(req, res) {
	/*
	req.db.models.user.find({
		"userName":req.body.userName
	}, function(err, users) {
		console.log("Creation double users test: %d", users.count > 0);
		console.log("test: %s", users[0].userName)
		if (users.count > 0)
			res.send("userName already use.");
		else
		{
			req.db.models.user.create(
				{
					userName : req.body.userName ? req.body.userName : "",
					password : req.body.password 
				},
			function(err, data) {
			if (!err)
				res.send(data);
			else 
				res.send(501, err);}
			);	
		}
	});
	*/
		req.db.models.user.create(
			{
				userName : req.body.userName ? req.body.userName : "",
				password : req.body.password 
			},
		function(err, data)
	{
		if (!err)
			res.send(data);
		else 
			res.send(501, err);}
		); 

};
