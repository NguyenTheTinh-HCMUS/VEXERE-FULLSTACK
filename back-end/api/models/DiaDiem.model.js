const mongoose=require('mongoose')


const orderSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ten: String,
    ds_tram: [{type: mongoose.Schema.Types.ObjectId ,ref: 'Tram'}]
})
module.exports=mongoose.model('DiaDiem',orderSchema,'DiaDiem')