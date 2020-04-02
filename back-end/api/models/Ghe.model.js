const mongoose=require('mongoose')
const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    loaiGhe: String,
    tenGhe: String,
    maGhe: String,
    loaiXe: {type: mongoose.Schema.ObjectId,ref: 'LoaiXe'}
})
module.exports=mongoose.model('Ghe',orderSchema,'Ghe')