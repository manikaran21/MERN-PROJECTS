import mongoose from 'mongoose' ;

const schema = mongoose.Schema ;

const recipeSchema = new schema({
    name:{
        type:String ,
        required:true 
    } ,
    description:{
        type:String ,
        required:true
    } ,
    ingredients :{
        type:String
    },
    category:{
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
