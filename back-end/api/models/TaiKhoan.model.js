const mongoose=require('mongoose')


const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ten: String,
    email: {type: String,unique: true,required: true},
    matKhau: {type: String,required: true},
    dienThoai: {type: String},
    hinhAnh: String,
    admin: {type: Boolean,default: false},
    ngayDoiMatKhau: {type: mongoose.Schema.Types.Date}
})
module.exports=mongoose.model('TaiKhoan',orderSchema,'TaiKhoan')