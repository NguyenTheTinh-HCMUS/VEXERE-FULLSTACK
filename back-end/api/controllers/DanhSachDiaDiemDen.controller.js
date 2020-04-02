

const TuyenDuong = require("../models/TuyenDuong.model");
const ChuyenXe = require("../models/ChuyenXe.model");


module.exports= async (req, res) => {
    try {
      const docs = await TuyenDuong.find({ to: req.body.diemBatDauId })
        .populate("to", "_id ten")
        .populate("from", "_id ten")
      if (docs.length > 0) {
        const data = {};
        data.diemBatDauId = docs[0].to._id;
        data.tenDiemBatDau = docs[0].to.ten;
        data.ds_diemDen = [];
        for (let i = 0; i < docs.length; i++) {
          let temp = {
            _id: docs[i].from._id,
            ten: docs[i].from.ten
          };
          try {
            temp.ds_chuyenXe = [];
            const chuyenxe = await ChuyenXe.find({ tuyen: docs[i]._id }).select(
              "_id tuyen ngayDi ngayDen"
            );
            temp.ds_chuyenXe = chuyenxe;
            data.ds_diemDen.push(temp);
          } catch (error) {
            return res.status(500).json(error);
          }
        }
  
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "Không tìm thấy Tuyến đường"
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }