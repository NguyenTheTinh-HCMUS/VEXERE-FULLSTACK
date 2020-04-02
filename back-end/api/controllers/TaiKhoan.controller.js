const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const multer = require("multer");
const md5 = require("md5");

const TaiKhoan = require("../models/TaiKhoan.model");


module.exports.DangNhap = (req, res) => {
  TaiKhoan.findOne({
    email: req.body.email
  })
    .then(doc => {
      if (!doc || doc === null) {
        return res.status(404).json({
          error: "email",
          message: "Email không tồn tại"
        });
      }
      bcrypt.compare(req.body.matKhau, doc.matKhau, (error, result) => {
        if (result) {
          try {
            const token = jwt.sign(
              {
                _id: doc._id,
                email: doc.email
              },
              process.env.JWT_KEY,
              { expiresIn: "7d" }
            );

            return res.status(200).json({
              _id: doc._id,
              ten: doc.ten,
              email: doc.email,
              dienThoai: doc.dienThoai,
              hinhAnh: doc.hinhAnh.startsWith("/uploads")
                ? req.headers.host + doc.hinhAnh
                : doc.hinhAnh,
              access_token: token
            });
          } catch (error) {
            res.status(500).json(error);
          }
        } else if (!result) {
          return res.status(401).json({
            error: "matKhau",
            message: "Mật khẩu không chính xác"
          });
        }
        return res.status(500).json(error);
      });
    })
    .catch(error => res.status(500).json(error));
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        md5(file.originalname) +
        "." +
        file.originalname.split(".")[1]
    );
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Định dạng file ảnh không phù hợp"), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
}).single("hinhAnh");

module.exports.DangKy = (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.status(404).json({
        error: "hinhAnh",
        message: err.message
      });
    }

    bcrypt.hash(req.body.matKhau, 10, (err, hash) => {
      if (!err) {
        const taiKhoan = new TaiKhoan({
          _id: mongoose.Types.ObjectId(),
          ten: req.body.ten,
          email: req.body.email,
          matKhau: hash,
          dienThoai: req.body.dienThoai,
          hinhAnh: `/uploads/${req.file.filename}`
        });
        taiKhoan
          .save()
          .then(doc => {
            res.status(201).json({
              _id: doc._id,
              ten: doc.ten,
              email: doc.email,
              dienThoai: doc.dienThoai,
              hinhAnh: req.headers.host + doc.hinhAnh
            });
          })
          .catch(error => res.status(500).json(error));
      } else {
        res.status(500).json({
          error: err
        });
      }
    });
  });
};
