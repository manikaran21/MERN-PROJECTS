const User = require('../models/user') ;


const Signup = async(req,res) => {
    try{
        let existingUser  =  await User.findOne({email:req.body.email}) ;
        if(existingUser){
            return res.status(409).json({message:"User already exists"}) ;
        }
        const user  = new User({
              
               email:req.body.email ,
               
        }) ;
        await user.save() ;
        return res.status(201).json({message:"User created Successfully" , user}) ;
    }catch(err){
      return res.status(400).json({error:err.message}) ;
    }  
}
const Login = async(req,res) => {
    try{
        let user = await User.findOne({email:req.body.email}) ;
        if(!user){
            return res.status(404).json({message:" Not Found "}) ;
        }
        return res.status(200).json({user}) ;  
    }catch(err){
        return res.status(400).json({error:err.message}) ;
    }
    
}
const AddFile = async(req,res) => {

    console.log(req.file);
   
    try{
        if(req.file){
            res.send("yes") ;
        }
        else{
            res.send("no");
        }
        // let user = await User.findOne({email:req.body.email}) ;
        // if(!user){
        //     return res.status(404).json({message:" Not Found "}) ;
        // }
        // return res.status(200).json({user}) ;  
    }catch(err){
        return res.status(400).json({error:err.message}) ;
    }
    
}


module.exports = {Signup,Login ,AddFile} 