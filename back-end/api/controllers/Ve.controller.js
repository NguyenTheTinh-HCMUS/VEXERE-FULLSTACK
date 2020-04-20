const mongoose = require("mongoose");
const shortid = require("shortid");
const Ve = require("../models/Ve.model");
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
    await ve.save();
    res.status(201).json(ve);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
