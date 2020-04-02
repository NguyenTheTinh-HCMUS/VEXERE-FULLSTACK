const mongoose=require('mongoose')
const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tuyenDuong: {type: mongoose.Schema.Types.ObjectId,ref: 'TuyenDuong'},
    daiLy: {type: mongoose.Schema.Types.ObjectId,ref: 'DaiLy'},
    loaiXe:  {type: mongoose.Schema.Types.ObjectId,ref: 'LoaiXe'},
    giaVe: {type: Number,required: true},
    giaVeTet: {type: Number},
    tuNgay: {type: mongoose.Schema.Types.Date},
    denNgay: {type: mongoose.Schema.Types.Date}
})
module.exports=mongoose.model('BangGia',orderSchema,'BangGia')