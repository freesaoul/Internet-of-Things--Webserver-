var orm = require('orm');

module.exports = function(db,cb)
{
    var Client = db.define("client", {
            name        : String,
           password    : String 
    });

    var Gateway = db.define("gateway", {
           adress      : String
    });

    Client.hasMany("gateway", Gateway,{}, {reverse : 'clients'});
    db.sync()
};
