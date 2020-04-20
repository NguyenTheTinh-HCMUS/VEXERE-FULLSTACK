const mongoose = require("mongoose");
const moment=require('moment')

const ChuyenXe = require("../models/ChuyenXe.model");
const Xe = require("../models/Xe.model");
const Ghe = require("../models/Ghe.model");
const DiaDiem = require("../models/DiaDiem.model");
const DaiLy = require("../models/DaiLy.model");
const Tram = require("../models/Tram.model");
const Ve = require("../models/Ve.model");
const BangGia=require('../models/BangGia.model')





module.exports.get_all_chuyenXe = async (req, res) => {
  try {
    const chuyenXe = await ChuyenXe.find();
    res.status(200).json(chuyenXe);
  } catch (error) {
    res.status(500).json(error);
  }
};
const TimDaiLy = async (xeId) => {
  const doc = await DaiLy.findOne({
    ds_xe: mongoose.Types.ObjectId(xeId),
  }).select("_id ten dienThoai diaChi ds_tram");
  return doc;
};
const TimBangGia=async(tuyenDuong,daiLy,loaiXe)=>{
  const doc=await BangGia.findOne({
      tuyenDuong,
      daiLy,
      loaiXe
  })

  return moment().isBetween(doc.tuNgay,doc.denNgay) ? doc.giaVeTet : doc.giaVe
}
module.exports.get_one_chuyeXe = async (req, res) => {
  try {
    const chuyenXe = await ChuyenXe.findById(req.params._id)
      .populate({
        path: "xe",
        select: "_id ten hinhAnh loaiXe",
        populate: {
          path: "loaiXe",
          select: "_id sucChua",
        },
      })
      .populate({
        path: "tuyen",
        populate: [
          {
            path: "to",
            select: "_id ten",
          },
          {
            path: "from",
            select: "_id ten",
          },
        ],
      });
    const ds_ghe = await Ghe.find({
      loaiXe: chuyenXe.xe.loaiXe._id,
    })
      .sort([["soGhe", 1]])
      .select("_id soGhe");

    //---------xu ly tram
    const diemDen = await DiaDiem.findById({ _id: chuyenXe.tuyen.to._id });
    const daiLy = await TimDaiLy(chuyenXe.xe._id);
    let ds_tram = diemDen.ds_tram.filter((value) =>
      daiLy.ds_tram.includes(value)
    );
    const tram = await Tram.find({
      _id: {
        $in: ds_tram,
      },
    });
    //----------xu li ghe
    // tim ghe da dat
    const ds_ve = await Ve.find({ chuyenXe: req.params._id });
    let dsGheDat = [];
    if (ds_ve.length > 0) {
      ds_ve.map((item) => {
        const temp = JSON.stringify(item._doc.ds_ghe);
        dsGheDat = [...dsGheDat, ...JSON.parse(temp)];
      });
    }
    ds_gheGheChuyenXe = ds_ghe.map((item) => {
      const temp = { ...item._doc };
      if (dsGheDat.indexOf(item._doc._id.toString()) > -1) {
        temp.gheTrong = false;
      } else {
        temp.gheTrong = true;
      }
      return temp;
    });

    //
    // tim gia
    let giaVe=await TimBangGia(chuyenXe.tuyen._id,daiLy._id,chuyenXe.xe.loaiXe._id)
   
    //

    res.status(200).json({
      ...chuyenXe._doc,
      ds_gheGheChuyenXe,
      tram,
      daiLy: {
        _id: daiLy._id,
        ten: daiLy.ten,
        dienThoai: daiLy.dienThoai,
      },giaVe
    });
  } catch (error) {
    console.error(error);

    res.status(500).json(error);
  }
};
