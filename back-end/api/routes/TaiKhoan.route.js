const express = require("express");
const router = express.Router();

const TaiKhoanController = require("../controllers/TaiKhoan.controller");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const md5 = require("md5");
const bcrypt = require("bcrypt");

const TaiKhoan = require("../models/TaiKhoan.model");

const auth_check=require('../midlewares/check-auth.midleware')
router.post("/DangNhap",TaiKhoanController.DangNhap);
router.post("/DangKy",TaiKhoanController.DangKy );


module.exports = router;
