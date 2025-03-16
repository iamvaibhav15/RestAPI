const mongoose = require("mongoose");

// Connection to Mongoose
async function connecttoMongoDB(url){
    return mongoose.connect(url)
}

module.exports = {connecttoMongoDB}