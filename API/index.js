var express=require('express')
require('./config/config');
require('./database');
var mongoose=require('mongoose')
const path=require('path')
const multer=require('multer')
const bodyParser=require('body-parser')
const csvtojson=require('csvtojson')
const bcrypt=require('bcryptjs');

var app=express()
app.use(express.static(__dirname+'./public/'));
const port=process.env.PORT;
const cors =require('cors')

//model
var user=require('./model/user.model');
var uploadmodel=require('./model/upload.model')







app.use(bodyParser.json());
app.use(cors({origin:'*'}));



app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})

app.get('/', (req,res)=>{
    res.json({
        'title':'Home page'
    })
})




app.post('/register',checkEmail,(req,res,next)=>{
    const hashedPassword=bcrypt.hashSync(req.body.password,10);

    var temp=new user({
        email:req.body.email,
        password:hashedPassword,
        fullname:req.body.fullname
    })
    
    temp.save((error,result)=>{
        if(result){
            return res.json({
                "message":"saved successfully",
                "result":"regiseration success"
            })
         
        }else{
            return res.json({
                "message":"did not saved",
                "result":"regiseration failed"
            })
        }
    })

})

app.post('/login',(req,res)=>{
    var email1=req.body.email;
    user.findOne({email:email1},(err,result)=>{
        if(result){
    
         
          var isMatched=bcrypt.compareSync(req.body.password,result.password);
            if(isMatched){
            res.json({
                "message":"login success"
            })
            }else{
                
            return res.json({
            message:'password did not matched...try again with correct password'
            })
            }
          
        }else{
            console.log(err)
            return res.json({
                "error":err,
                "message":"user does not exist....create new account"
                
            })
        }

    })

})


//multer function implementaion
const Storage=multer.diskStorage({
    destination:"./public/uploads/",
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})//multer ends

//multer called
var upload=multer({
    storage:Storage
}).single('file')











app.post('/upload',upload,(req,res,next)=>{

  

    var temp=new uploadmodel({
     file:req.file.filename
    })
    temp.save((error,result)=>{
        if(error){
           return res.json({
                status:false,
                message:'upload failed...',
                error:error
            })
        }
        if(result){

          res.json({
                status:true,
                message:'upload success...',
                result:result
            })
         
        }
        
    });





})












app.get('/csvtojson',(req,res)=>{
    const csvfilepath='simple.csv'
    csvtojson().fromFile(csvfilepath).then((json)=>{
        return res.json(json);
       
    })

   
   
    
})




function checkEmail(req,res,next){
    var email=req.body.email;
    var checkexistingemail=user.findOne({email:email});
    checkexistingemail.exec((err,data)=>{
        if(err) throw err;
        if(data){
            return res.render('registeration',{message:'email/user already exist....'})
        }
        next(); 
    })
}