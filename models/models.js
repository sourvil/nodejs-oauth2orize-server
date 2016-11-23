var mongoose = require("mongoose");

var clientSchema = new mongoose.Schema(
    {
        id: String,
        secret: String,         // will be encrypted
        name: String,
        userId: String
    }
);

var codeSchema   = new mongoose.Schema({
        value: String,          // will be encrypted
        redirectUri: String,
        userId: String,
        clientId: String
});

var tokenSchema   = new mongoose.Schema({
        value: String,          // will be encrypted
        userId: String,
        clientId: String
});


var carSchema = new mongoose.Schema(
    {
        owner: String,
        year: Number
    }
);

var userSchema = new mongoose.Schema(
    {
        username: String,
        password: String    // will be encrypted
    }
);

userSchema.methods.verifyPassword = function(password, cb) {
    if(password == this.password)
        return cb(null, true);
    return cb("Wrong password!", false);
};

mongoose.model('Client', clientSchema);
mongoose.model('Code', codeSchema);
mongoose.model('Token', tokenSchema);
mongoose.model('Car', carSchema);
mongoose.model('User', userSchema);