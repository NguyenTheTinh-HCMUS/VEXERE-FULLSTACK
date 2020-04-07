const express=require('express')
const router=express.Router()



const danhGiaController=require('../controllers/DanhGia.controller')

router.post('/ThemDanhGia',danhGiaController.ThemDanhGia)

router.post('/Like',danhGiaController.Like)
module.exports=router