const express = require("express");
const router = express.Router();
const mongoose=require('mongoose')

const moment=require('moment')


const Xe=require('../models/Xe.model')
const LoaiXe=require('../models/LoaiXe.model')

const ChuyenXe=require('../models/ChuyenXe.model')

const DaiLy=require('../models/DaiLy.model')
const TuyenXe=require('../models/TuyenDuong.model')

const BangGia=require('../models/BangGia.model')
const DanhGia=require('../models/DanhGia.model')

const TimBangGia=async(tuyenDuong,daiLy,loaiXe)=>{
    const doc=await BangGia.findOne({
        tuyenDuong,
        daiLy,
        loaiXe
    })

    return moment().isBetween(doc.tuNgay,doc.denNgay) ? doc.giaVeTet : doc.giaVe
}


const TimDaiLy=async(xeId)=>{
   
    const doc=await DaiLy.findOne({
        ds_xe: mongoose.Types.ObjectId(xeId)
    }).select('_id ten dienThoai diaChi')
    
    return doc
}


const TimDanhGia=async(xeId,req)=>{
    const danhGia=await DanhGia.find({xe:xeId}).select(
        '_id sao ds_Like ngay noiDung taiKhoan'
    ).populate('taiKhoan','_id ten hinhAnh')
    let customDanhGia=danhGia.map(item=>{
        if(item.taiKhoan.hinhAnh.startsWith("/uploads")){
            item.taiKhoan.hinhAnh= req.headers.host+item.taiKhoan.hinhAnh
            
        }
      
        return item
    })
    return customDanhGia
}

router.post("/",async(req,res)=>{
    
    
   try{
    const data={}
  
    const chuyenXe=await ChuyenXe.find({
        tuyen: req.body.tuyenDuong,
        ngayDi:{
            "$gte":moment(req.body.ngayDi),
            "$lt": moment(req.body.ngayDi).add(1,'d')
        }
    }).populate({
        path: 'xe',
        populate: {
            path: 'loaiXe'
        }
    }).populate({
        path: 'tuyen',
        populate:[
            {path: 'to',select: '_id ten'},
            {
                path: 'from',select: '_id ten'
            }
        ]
    })



    data.tuyenXe=chuyenXe[0].tuyen
    data.ds_chuyenXe=[]
    for(let i=0;i<chuyenXe.length;i++){
        const temp={}
        temp._id=chuyenXe[i]._id
        temp.ngayDi=chuyenXe[i].ngayDi
        
        temp.ngayDen=chuyenXe[i].ngayDen
      
        temp.dauBen=chuyenXe[i].dauBen
        temp.cuoiBen=chuyenXe[i].cuoiBen

        const _ttXe={}
        _ttXe._id=chuyenXe[i].xe._id
        _ttXe.tenXe=chuyenXe[i].xe.ten
        _ttXe.loaiXe=chuyenXe[i].xe.loaiXe
        _ttXe.hinhAnh=chuyenXe[i].xe.hinhAnh
        _ttXe.danhGia=chuyenXe[i].xe.danhGia
        _ttXe.wifi=chuyenXe[i].xe.wifi
        _ttXe.tivi=chuyenXe[i].xe.tivi
        _ttXe.bienSo=chuyenXe[i].xe.bienSo
        const daiLy=await TimDaiLy(chuyenXe[i].xe._id)
        _ttXe.daiLyXe=daiLy
        _ttXe.danhSachDanhGia=await TimDanhGia(chuyenXe[i].xe._id,req)

        temp.thongTinXe=_ttXe

        temp.giaVe=await TimBangGia(data.tuyenXe._id,daiLy._id,chuyenXe[i].xe.loaiXe._id)
        temp.ds_ve=chuyenXe[i].ds_ve

      

        


        data.ds_chuyenXe.push(temp)
    }




    res.status(200).json(data)
   }
   catch(error){
       res.status(500).json(error)
   }
});
module.exports = router;
