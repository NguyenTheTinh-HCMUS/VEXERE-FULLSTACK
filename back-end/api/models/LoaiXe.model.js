const mongoose=require('mongoose')


const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sucChua: {type: Number}
})
module.exports=mongoose.model('LoaiXe',orderSchema,'LoaiXe')