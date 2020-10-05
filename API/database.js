var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log('mongodb connection succeded......')
    }else{
        console.log('error in mongodb connection')
    }
})
