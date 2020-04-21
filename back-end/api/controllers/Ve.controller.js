const mongoose = require("mongoose");
const shortid = require("shortid");
const Ve = require("../models/Ve.model");
const sendMail=require('../untils/mailer.until')
const htmlContent=require('../untils/htmlContent')
module.exports.datVe=async (req, res) => {
  try {
    const datVe = (temp, data) => {
      return new Ve({
        _id: mongoose.Types.ObjectId(),
        maVe: shortid.generate(),
        ds_ghe: req.body.ds_ghe.map((item) => mongoose.Types.ObjectId(item)),
        tram: mongoose.Types.ObjectId(req.body.tram),
        chuyenXe: mongoose.Types.ObjectId(req.body.chuyenXe),
        [temp]: data,
      });
    };
    let ve = null;
    if (req.body.taiKhoan) {
      if (req.body.taiKhoan !== req._decoded._id) {
        throw new Error("Token khong chinh xac");
      }
      ve = datVe("taiKhoan", mongoose.Types.ObjectId(req.body.taiKhoan));
    } else if (req.body.thongTin) {
      ve = datVe("thongTin", req.body.thongTin);
    }
     const doc= await ve.save()
     const newDoc=await doc.populate('tram').populate({
       path:'chuyenXe',
       populate:[
         {
           path:'tuyen',
           populate:[
             {
               path:'to',
               select:'ten'
             },
             {
              path:'from',
              select:'ten'

            }
           ]
         },
         {
           path:'xe',
           select:'ten bienSo'
         }
       ]
     }).populate('ds_ghe').execPopulate()
     let temp={}
     temp.ngayDat=newDoc.ngayDat
     temp.ds_ghe=newDoc.ds_ghe.map(item=>item.soGhe)
     temp.maVe=newDoc.maVe
     temp.tram=newDoc.tram
     temp.thongTin=newDoc.thongTin
     temp.ngayDi=newDoc.chuyenXe.ngayDi
     temp.ngayDen=newDoc.chuyenXe.ngayDen
     temp.dauBen=newDoc.chuyenXe.dauBen
     temp.cuoiBen=newDoc.chuyenXe.cuoiBen
     temp.di=newDoc.chuyenXe.tuyen.to.ten
     temp.den=newDoc.chuyenXe.tuyen.from.ten
     temp.xe=newDoc.chuyenXe.xe

    //  console.log(htmlContent(temp))

    if (req.body.thongTin){
      sendMail(req.body.thongTin.email,`VEXERE.com`,htmlContent(temp))
    }
    res.status(201).json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
