const mongoose=require('mongoose')
var uploadSchema=new mongoose.Schema({
    file:{
        type:String
    }
})
mongoose.model('Upload',uploadSchema);
module.exports=mongoose.model('Upload');