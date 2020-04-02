const express = require("express");
const router = express.Router();

const danhSachDiaDiemDenController=require('../controllers/DanhSachDiaDiemDen.controller')



router.post("/",danhSachDiaDiemDenController);
module.exports = router;
