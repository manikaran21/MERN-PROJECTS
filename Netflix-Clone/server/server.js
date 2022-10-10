const express = require('express') ;
const mongoose = require('mongoose') ;
const cors  = require('cors') ;
const app = express() ;
const userRoutes = require('./routes/UserRoutes') ;

//
app.use(express.json()) ;
app.use(cors()) ;
//db

mongoose.connect('mongodb://0.0.0.0:27017/netflix',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("Connected to DB"))
.catch(err=>console.log(err)) ;


app.use('/api/user',userRoutes) ;

app.listen(5000,()=>console.log("Server is running on port 5000")) ;