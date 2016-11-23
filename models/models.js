var mongoose = require("mongoose");

var clientSchema = new mongoose.Schema(
    {
        clientId: String,
        clientName: String,
        clientSecret: String
    }
);

var carSchema = new mongoose.Schema(
    {
        owner: String,
        year: Number
    }
);

mongoose.model('Client', clientSchema);
mongoose.model('Car', carSchema);
