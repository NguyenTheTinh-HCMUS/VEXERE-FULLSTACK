const mongoose=require('mongoose')
const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ten: String,
    dienThoai: String,
    diaChi: String
})
module.exports=mongoose.model('Tram',orderSchema,'Tram')