const mongoose=require('mongoose')
const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ten: String,
    hinhAnh: String,
    danhGia: Number,
    wifi: Boolean,
    tivi: Boolean,
    bienSo:{type: String,required: true,unique: true},
    loaiXe: {type: mongoose.Schema.Types.ObjectId ,ref: 'LoaiXe'},
    trucDuong: {type: mongoose.Schema.Types.ObjectId,ref: 'TrucDuong'}
})
module.exports=mongoose.model('Xe',orderSchema,'Xe')