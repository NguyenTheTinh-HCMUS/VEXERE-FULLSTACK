const mongoose=require('mongoose')
const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tuyen: {type:mongoose.Schema.Types.ObjectId,ref: 'TuyenDuong' },
    ngayDi: {type: Date ,required: true},
    ngayDen: {type: Date,require: true},
    xe: {type: mongoose.Schema.Types.ObjectId,ref: 'Xe'},
    dauBen: String,
    cuoiBen: String,
    ds_ve:[{type: mongoose.Schema.Types.ObjectId,ref: 'Ve'}]
})
module.exports=mongoose.model('ChuyenXe',orderSchema,'ChuyenXe')