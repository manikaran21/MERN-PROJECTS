import mongoose from 'mongoose';
import Recipe from '../model/Recipe';
import User from '../model/User';

export const getAllRecipes = async (req,res,next) => {
    let recipes ;
    try{
      recipes = await Recipe.find().populate('user') 
    }catch(err){
        return console.log(err) ;
    }
    if(!recipes){
        return res.status(404).json({message:"Not Found"}) ;
    }

    return res.status(200).json({recipes}) ;

} ;

export const addRecipe =async(req,res,next) => {
  const { name ,price ,image ,coupon,discount,  user } = req.body ;
   
  let existingUser ;
  try{
  existingUser = await User.findById(user) ;
  }catch(err){
    return console.log(err) ;
  }
  if(!existingUser){
    return res.status(400).json({message:"Unable to find user by this Id"}) ;
  }
  
  // new instance
  const recipe = new Recipe( {
       name,
       price,
       coupon,
       discount,
       image,
       user 
    }) ;
    try{
    
     const session = await mongoose.startSession() ;
     session.startTransaction() ;
     await recipe.save();
 
     existingUser.recipes.push(recipe) ;
     await existingUser.save(); 
     await session.commitTransaction() ;

    }catch(err){
         console.log(err) ;
         return res.status(500).json({message:err}) ;
    }
    return res.status(200).json({recipe}) ;

} ;

export const updateRecipe = async(req,res,next) => {
  const { name ,price ,image ,coupon,discount,  user } = req.body ;
    const recipeId = req.params.id ;
    let recipe ;
    try{
        recipe = await Recipe.findByIdAndUpdate(recipeId ,{
          name,
          price,
          coupon,
          discount,
          image,
        }) ;
    
    }catch(err){
        return console.log(err) ;
    }
    if(!recipe){
        return res.status(500).json({message:"Unable to update "}) ;
    }
    return res.status(200).json({recipe}) ; 
} ;

export const getById = async(req,res,next) => {
   const id = req.params.id ;
   let recipe ;
   try{
    recipe = await Recipe.findById(id).populate('user','-password') ;
   }catch(err) {
    return console.log(err) ;
   }
   if(!recipe){
    return res.status(404).json({message:"Not Found"}) ;
   }
   return res.status(200).json({recipe}) ;
 } ;

 export const deleteRecipe = async(req,res,next) => {
   const id = req.params.id ;
   let recipe ;
   try{

   recipe = await Recipe.findByIdAndRemove(id).populate('user') ; // populate works for the reference collection
   console.log(recipe) ;
   await recipe.user.recipes.pull(recipe) ; // pull is method in mongoose to pull out element based on Id
   await recipe.user.save() ;

   }catch(err){
    return console.log(err) ; 
   }
   if(!recipe){
    return res.status(500).json({message:"unable to delete"}) ;
   }
   return res.status(200).json({message:"successfully deleted"}) ;
 } ;

 export const getByUserId = async(req,res,next) => {
  console.log("hello this is user") ;
   const userId = req.params.id ;
   let userRecipes ;
   try{
     userRecipes = await User.findById(userId).populate("recipes") ;
     console.log(userRecipes) ;
   }catch(err){
    return console.log(err) ;
   }
   if(!userRecipes){
    return res.status(404).json({message:"Not found"}) ;
   }
   return res.status(200).json({user:userRecipes}) ;
 } ;

export const SearchItems = async (req,res,next) =>{
  let searchItem = req.query.item.toLowerCase() ;
  console.log(searchItem);
  const recipes = await Recipe.find().populate('user','-password') ;
  const newRecipes =  recipes.filter((recipe)=>{
    let item = recipe.name.toLowerCase() ;
    if(item.includes(searchItem)){
     return true ;
    }else{
      return false ;
    }
  }) ;
  console.log(newRecipes);
  return res.status(200).json({user:newRecipes}) ;
  
}
  
 
 