const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const TaiKhoanRouter = require("./api/routes/TaiKhoan.route");
const DiaDiemRouter = require("./api/routes/DiaDiem.route");
const DanhSachDiaDiemDenRouter = require("./api/routes/DanhSachDiaDiemDen.router");
const TimChuyenXeRouter = require("./api/routes/TimChuyenXe.route");
const XacNhanMail=require('./api/routes/XacNhanMail.route')
//seting cross origin resource sharing
app.use(cors());

// set up database
mongoose.connect(
  process.env.URL_DATABASE,

  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("-----> connect succeed database");
});
// set up body

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//static file
app.use(express.static("public"));

//set morgan

app.use(morgan("dev"));
//set up routes

app.use("/TaiKhoan", TaiKhoanRouter);
app.use("/DiaDiem", DiaDiemRouter);
app.use("/DanhSachDiaDiemDen", DanhSachDiaDiemDenRouter);
app.use("/TimChuyenXe", TimChuyenXeRouter);
app.use('/XacNhanMail',XacNhanMail)
//


// set not found when find router
app.use((req,res,next)=>{


})
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.status(err.status || 5000);
  res.json({
    message: err.message
  });
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is runing at  ${port}`);
});
