var orm = require('orm');

module.exports = function(db,cb)
{
    var User = db.define("user", {
            userName        : String,
            password        : String 
    },
    {
        validations: {
            userName : [orm.enforce.ranges.length(1, undefined, "to short"), orm.enforce.unique("name already taken!")],
            password : orm.enforce.ranges.length(3, undefined, "to short")
        }
    });

    var Gateway = db.define("gateway", {
           address      : String
    },
    {
        validations: {
            address : [orm.enforce.ranges.length(3, undefined, "to short"), orm.enforce.unique("address already taken!")]
        }
    });

    User.hasMany("gateway", Gateway,{}, {reverse : 'users'});

    db.sync()
};
