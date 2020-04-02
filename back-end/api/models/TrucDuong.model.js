const mongoose=require('mongoose')


const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    haiTuyen:[{type: mongoose.Schema.Types.ObjectId,ref: 'TuyenDuong'}],
    quangDuong: {type: Number}
})
module.exports=mongoose.model('TrucDuong',orderSchema,'TrucDuong')