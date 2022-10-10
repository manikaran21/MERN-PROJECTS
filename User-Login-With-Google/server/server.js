require('dotenv').config() ;
const express = require("express") ;
const mongoose = require('mongoose') ;
const cors = require('cors') ;

const router = require('./routes/userRoutes') ;


const app = express() ;

app.use(cors()) ;
app.use(express.json({extended:true})) ;
app.use(express.urlencoded({extended:true})) ;


mongoose.connect('mongodb://0.0.0.0:27017/google',{useNewUrlParser:true}).then(()=>console.log("Connected to DB")).catch(err=>console.log(err)) ;






app.use('/user',router) ;

app.listen(8000,()=> {
  console.log("Server is running on port 8000") ;
}) ;

