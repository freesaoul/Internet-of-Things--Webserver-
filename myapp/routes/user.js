/* GET users listing. */
exports.list = function(req, res){
  res.send('respond with a resource');
};

exports.create = function(req, res)
{
	req.db.models.user.create(
		{
			userName : req.body.userName ? req.body.userName : "",
			password : req.body.password
		}, function(err, data) {
			if (!err)
				res.send(data);
			else
				res.send(501, err);
		});
};
