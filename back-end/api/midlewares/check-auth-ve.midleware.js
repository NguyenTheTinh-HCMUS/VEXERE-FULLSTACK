const check_token=require('./check-auth.midleware')
module.exports=(req,res,next)=>{
    if(req.body.taiKhoan){
       return check_token(req,res,next)
    }
    else{
        next()
    }
}