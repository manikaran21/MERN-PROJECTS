import mongoose from 'mongoose' ;

const schema = mongoose.Schema ;

const recipeSchema = new schema({
    name:{
        type:String ,
        required:true 
    } ,
    price:{
        type:String ,
        required:true
    } ,
    coupon :{
        type:String
    },
    discount:{
     type:String
    } ,
    image:{
        type:String ,
        required:true
    } ,
    user :{  // which user is posted
        type:mongoose.Types.ObjectId ,
        ref:"User" ,
        required:true
    }

}) ;

export default mongoose.model("Recipe",recipeSchema) ;
