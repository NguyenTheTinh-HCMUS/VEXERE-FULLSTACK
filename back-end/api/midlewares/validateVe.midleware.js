const TaiKhoan = require("../models/TaiKhoan.model");
const Tram = require("../models/Tram.model");
const Ve = require("../models/Ve.model");
const ChuyenXe = require("../models/ChuyenXe.model");
const Ghe = require("../models/Ghe.model");
module.exports = async (req, res, next) => {
  try {
    if (req.body.taiKhoan) {
      const taiKhoan = await TaiKhoan.findById({
        _id: req.body.taiKhoan,
      });
      if (!taiKhoan) {
        throw new Error("Tai khoan khong ton tai");
      }
    }

    const tram = await Tram.findById({
      _id: req.body.tram,
    });
    if (!tram) {
      throw new Error("Tram khong ton tai");
    }
    const chuyenXe = await ChuyenXe.findById({
      _id: req.body.chuyenXe,
    });
    if (!chuyenXe) {
      throw new Error("Chuyen Xe khong ton tai");
    }

    const ds_ve = await Ve.find({ chuyenXe: req.body.chuyenXe });
    let dsGheDat = [];
    if (ds_ve.length > 0) {
      ds_ve.map((item) => {
        const temp = JSON.stringify(item._doc.ds_ghe);
        dsGheDat = [...dsGheDat, ...JSON.parse(temp)];
      });
    }

    for (let i = 0; i < req.body.ds_ghe.length; i++) {
      if (dsGheDat.indexOf(req.body.ds_ghe[i]) > -1) {
        throw new Error("Ghe da duoc dat");
      }
      const ghe = await Ghe.findById({ _id: req.body.ds_ghe[i] });
      if (!ghe) {
        throw new Error("Ghe khong ton tai");
      }
    }

    next();
  } catch (error) {
    console.error(error);

    res.status(404).json({ error: error.message });
  }
};
