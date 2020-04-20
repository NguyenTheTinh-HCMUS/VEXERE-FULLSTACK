const mongoose=require('mongoose')
const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    soGhe: {type: Number,required: true},
    loaiXe: {type: mongoose.Schema.ObjectId,ref: 'LoaiXe'}
})
module.exports=mongoose.model('Ghe',orderSchema,'Ghe')