const mongoose=require('mongoose')
const DiaDiem=require('../models/DiaDiem.model')
module.exports.get_all=(req,res)=>{
    DiaDiem.find().select('_id ten').then(docs=>{
     
        res.status(200).json(docs)

    }).
    catch(error=>res.status(500).json(error))

}

module.exports.get_one=(req,res)=>{

    DiaDiem.findById({_id: req.params.id}).select('_id ten').then(doc=>{
        res.status(200).json(doc)

    }).
    catch(error=>res.status(500).json(error))

}
module.exports.createDiaDiem=(req,res)=>{
    const diaDiem=new DiaDiem({
        _id: mongoose.Types.ObjectId(),
        ten: req.body.ten,
        ds_tram: []
    })
    diaDiem.save().then(doc=>{
        res.status(201).json(doc)
    }).catch(error=>res.status(500).json(error))
}
