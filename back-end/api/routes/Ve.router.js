const express=require('express')
const router=express.Router()


const validateVe=require('../midlewares/validateVe.midleware')
const check_auth=require('../midlewares/check-auth-ve.midleware')
const Vecontroller=require('../controllers/Ve.controller')
router.post('/DatVe',check_auth,validateVe,Vecontroller.datVe)
module.exports=router