const express = require("express");
const router = express.Router();

const mongoose=require('mongoose')
const DiaDiem=require('../models/DiaDiem.model')

const auth_check=require('../midlewares/check-auth.midleware')
const admin_check=require('../midlewares/check-admin.midleware')
const diaDiemController=require('../controllers/DiaDiem.controller')
router.get('/',diaDiemController.get_all)
router.get('/:id',diaDiemController.get_one)
router.post('/',auth_check,admin_check,diaDiemController.createDiaDiem)

module.exports = router;
