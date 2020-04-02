const mongoose=require('mongoose')


const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    maVe:{type: String,unique: true,required: true},
    ngayDat:{type: mongoose.Schema.Types.Date,default: Date.now()},
    taiKhoan: {type: mongoose.Schema.Types.ObjectId,ref:'TaiKhoan'},
    ghe:{type: mongoose.Schema.Types.ObjectId,ref:'Ghe'},
    tram: {type: mongoose.Schema.Types.ObjectId,ref:'Tram'}
})
module.exports=mongoose.model('Ve',orderSchema,'Ve')