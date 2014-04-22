var orm = require('orm');

module.exports = function(db,cb)
{
    var User = db.define("user", {
            userName        : String,
            password        : String 
    });

    var Gateway = db.define("gateway", {
           adress      : String
    });

    User.hasMany("gateway", Gateway,{}, {reverse : 'users'});
    db.sync()
};
