const express = require("express");

const router = express.Router();


const XacNhanMailController=require('../controllers/XacNhanMail.controller')


const auth_check=require('../midlewares/check-auth.midleware')
router.post("/GuiMail",XacNhanMailController.GuiMail);

router.post('/KiemTraHanToken',auth_check,XacNhanMailController.KiemTraHanToken)

router.post('/ThayDoiMatKhau',auth_check,XacNhanMailController.ThayDoiMatKhau)
module.exports = router;
