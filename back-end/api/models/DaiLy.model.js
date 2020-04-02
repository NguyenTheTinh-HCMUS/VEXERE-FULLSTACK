const mongoose=require('mongoose')


const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ten: String,
    dienThoai: String,
    diaChi: String,
    ds_xe: [{type: mongoose.Schema.Types.ObjectId,ref:'Xe'}],
    ds_tram: [{type: mongoose.Schema.Types.ObjectId,ref:'Tram'}]
})
module.exports=mongoose.model('DaiLy',orderSchema,'DaiLy')