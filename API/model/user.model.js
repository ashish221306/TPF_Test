const mongoose=require('mongoose')
var userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:'Fullname can\'t be empty',
    },
    email:{
        type:String,
        required:'Email can\'t be empty',
    },
    password:{
        type:String,
        required:'Password can\'t be empty',
        minlength:[4,'Password must be atleast 4 character long']
    },
    saltSecret:String
})
mongoose.model('User',userSchema);
module.exports=mongoose.model('User');