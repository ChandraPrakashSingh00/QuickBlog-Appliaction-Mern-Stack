const mongoose = require("mongoose");

function connectTODB(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(() =>{
        console.log("Connected To Mongodb");
    })
    .catch((error) =>{
        console.log("Error");
    });
}

module.exports = connectTODB;