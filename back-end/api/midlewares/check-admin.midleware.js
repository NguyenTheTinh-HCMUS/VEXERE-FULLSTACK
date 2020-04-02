const TaiKhoan=require('../models/TaiKhoan.model')
module.exports=(req,res,next)=>{
    TaiKhoan.findById({_id: req._decoded._id}).then(doc=>{
        if(doc.admin &&doc.admin===true && req._decoded.email===doc.email){
            next()
        }
        return res.status(403).json({
            message: 'Tài khoản không có quyền với request'
        })
    }).
    catch(error=>res.status(500).json(error))

}