const mongoose = require('mongoose') ;
const userSchema = new mongoose.Schema({
    email:{
        type:String ,
        required:true
    } ,
    file:Array ,
});


module.exports = mongoose.model("User",userSchema) ;