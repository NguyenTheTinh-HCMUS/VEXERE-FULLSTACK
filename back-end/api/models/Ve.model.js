const mongoose = require("mongoose");
const arrayUniquePlugin = require('mongoose-unique-array');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  maVe: { type: String, unique: true, required: true },
  ngayDat: { type: mongoose.Schema.Types.Date, default: Date.now() },
  ds_ghe: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ghe", unique: true }],
  tram: { type: mongoose.Schema.Types.ObjectId, ref: "Tram" },
  chuyenXe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChuyenXe",
    required: true,
  },
  taiKhoan: { type: mongoose.Schema.Types.ObjectId, ref: "TaiKhoan" },
  thongTin: {
    hoTen: { type: String},
    email: { type: String,match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    soDienThoai: { type: String,match:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/},
  },
});
orderSchema.plugin(arrayUniquePlugin);
module.exports = mongoose.model("Ve", orderSchema, "Ve");
