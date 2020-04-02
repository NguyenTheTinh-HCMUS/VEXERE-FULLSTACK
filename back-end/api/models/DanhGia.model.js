const mongoose=require('mongoose')


const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   sao:{type: Number,default: 1},
   noiDung: {type: String},
   xe: {type: mongoose.Schema.Types.ObjectId,ref: 'Xe'},
   taiKhoan: {type: mongoose.Schema.Types.ObjectId,ref: 'TaiKhoan'},
   ds_Like:[
       {type: mongoose.Schema.Types.ObjectId,ref:'TaiKhoan'}
   ],
   ngay: {type: Date,default: Date.now()}
})
module.exports=mongoose.model('DanhGia',orderSchema,'DanhGia')