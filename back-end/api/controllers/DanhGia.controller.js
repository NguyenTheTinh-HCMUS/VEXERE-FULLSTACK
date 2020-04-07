const mongoose=require('mongoose')
const DanhGia=require('../models/DanhGia.model')
const TaiKhoan=require('../models/TaiKhoan.model')
const Xe=require('../models/Xe.model')

module.exports.ThemDanhGia=async(req,res)=>{
    try{
        const taiKhoan=await TaiKhoan.findById(req.body.taiKhoan)
        if(!taiKhoan){
            throw new Error('Tai Khoan Khong Ton Tai')
        }
        const xe=await TaiKhoan.findById(req.body.taiKhoan)
        if(!xe){
            throw new Error('Xe và Tài Khoản Khong Ton Tai')
        }
        const danhGia=new DanhGia({
            _id:  mongoose.Types.ObjectId(),
            sao: req.body.sao,
            noiDung:req.body.noiDung,
            xe: req.body.xe,
            taiKhoan: req.body.taiKhoan,
            ds_Like:[],
            ngay: new Date()
        })
        const doc= await danhGia.save()
        const newDoc=await doc.populate('taiKhoan','_id hinhAnh ten').execPopulate()
        if(newDoc.taiKhoan.hinhAnh.startsWith("/uploads")){
            newDoc.taiKhoan.hinhAnh= req.headers.host+newDoc.taiKhoan.hinhAnh
        }
        res.status(201).json(newDoc)
    }
    catch(error){
        res.status(500).json(error)
    }

}
module.exports.Like=async(req,res)=>{
    try{
       const taiKhoan=await TaiKhoan.findById(req.body.taiKhoan)
       if(!taiKhoan){
           throw new Error('Tai Khoan Khong Ton Tai')
       }
       
        const doc=await DanhGia.findById(req.body.danhGia).populate({
            path: 'taiKhoan', select: '_id hinhAnh ten'
        })
      
        const pos=doc.ds_Like.findIndex(item=>{
            
          return   item==req.body.taiKhoan})
      
        if(pos>-1){
            doc.ds_Like.splice(pos,1)
        }
        else{
            doc.ds_Like=[...doc.ds_Like,req.body.taiKhoan]
        }
        const newDoc=await doc.save()
        if(newDoc.taiKhoan.hinhAnh.startsWith("/uploads")){
            newDoc.taiKhoan.hinhAnh= req.headers.host+newDoc.taiKhoan.hinhAnh
        }
        res.status(200).json(newDoc)
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }


}


