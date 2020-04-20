const express=require('express')
const router=express.Router()

const chuyenXecontroller=require('../controllers/ChuyenXe.controller')

router.get('/',chuyenXecontroller.get_all_chuyenXe)

router.get('/:_id',chuyenXecontroller.get_one_chuyeXe)
module.exports=router