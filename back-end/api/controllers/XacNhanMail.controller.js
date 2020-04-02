const jwt = require("jsonwebtoken");
const sendMail = require("../untils/mailer.until");

const TaiKhoan = require("../models/TaiKhoan.model");
const bcrypt = require("bcrypt");

const auth_check = require("../midlewares/check-auth.midleware");

module.exports.GuiMail = async (req, res) => {
  try {
    const taiKhoan = await TaiKhoan.findOne({
      email: req.body.email
    });

    if (taiKhoan) {
        taiKhoan.ngayDoiMatKhau = new Date();
   
        await taiKhoan.save();
      jwt.sign(
        {
          _id: taiKhoan._id,
          email: taiKhoan.email
        },
        process.env.JWT_KEY,
        {
          expiresIn: 60 * 5
        },
        async (err, token) => {
          if (token) {
            let a = token.split(".").join("'a'");

            const href = `href="${req.headers.origin}/XacNhanMatKhau/${a}"`;
            await sendMail(
              req.body.email,
              "VeXeRe - Xác nhận mật khẩu",
              `<p>Nếu như bạn muốn khôi phục lại mật khẩu (Lưu ý link chỉ tồn tại trong 5 phút)</p><a ${href} >Nhấp vào link</a>`
            );
            res.status(200).json({
              message: "Gửi mail thành công"
            });
          } else {
            res.status(500).json(err);
          }
        //   console.log(token);
        }
      );
    } else {
      res.status(404).json({
        message: "email khoong ton at"
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.KiemTraHanToken = (req, res) => {
  res.status(200).json({
    message: "Token còn hạn"
  });
};
module.exports.ThayDoiMatKhau = async (req, res) => {
  try {
    const body = req._decoded;
    const taiKhoan = await TaiKhoan.findOne({
      _id: body._id,
      email: body.email
    });
    if (taiKhoan && taiKhoan.ngayDoiMatKhau) {
      bcrypt.hash(req.body.matKhau, 10, async (err, hash) => {
        taiKhoan.ngayDoiMatKhau = undefined;
        taiKhoan.matKhau = hash;
        await taiKhoan.save();
        res.status(200).json({
          message: "Đổi tài khoản thành công"
        });
      });
    } else {
      es.status(404).json({
        message: "Not found"
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
