const mongoose=require('mongoose')


const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    to: {type:mongoose.Schema.Types.ObjectId,ref: 'DiaDiem' },
    from: {type:mongoose.Schema.Types.ObjectId,ref: 'DiaDiem' }
})
module.exports=mongoose.model('TuyenDuong',orderSchema,'TuyenDuong')