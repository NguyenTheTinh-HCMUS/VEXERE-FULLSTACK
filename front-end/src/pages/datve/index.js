import React, { Fragment, useState, useEffect } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./style.scss";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { thongTinChuyenXe_request_action } from "../../redux/actions/datve.action";
import { connect } from "react-redux";
import ComboBox_DanhSachTram from "../../components/danh-sach-tram";
import Button from "@material-ui/core/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "../../components/scss/index.scss";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import CallIcon from "@material-ui/icons/Call";
import MoneyIcon from "@material-ui/icons/Money";
import DatVeStepper from "../../components/stepper";
import moment from "moment";
import Xe from "../../components/xe/index";
import { trangThaiGhe } from "../../constants/index";
import ThongTinKhachHang from "../../components/thong-tin-khach-hang";
import ThanhToan from "../../components/thanh-toan";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function DatVe(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [tiepTuc, settiepTuc] = useState(true)
  const [thongTin, setthongTin] = useState({})


  const handleNext = () => {
    if (activeStep === 0) {
      if (localStorage.getItem("TAIKHOAN")) {
        setActiveStep((prevActiveStep) => prevActiveStep + 2);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    settiepTuc(false)
    if (activeStep === 2) {
      if (localStorage.getItem("TAIKHOAN")) {
        setActiveStep((prevActiveStep) => prevActiveStep - 2);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      }
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    props.layThongTinChuyenXe(props.match.params.id);
  }, []);
  const [gheChon, setgheChon] = useState([]);
  useEffect(() => {
    let ds_gheChon = props.danhSachGhe.filter(
      (item) => item.status === trangThaiGhe[3]
    );
    setgheChon(ds_gheChon);
    if(ds_gheChon.length>0){
      settiepTuc(false)
    }
    else{
      settiepTuc(true)
    }
  }, [props.danhSachGhe]);
  const showGhe = () => {
    let kq = "";
    gheChon.map((item, index) => {
      if (index === 0) {
        kq = kq.concat("", String(item.soGhe));
      } else {
        kq = kq.concat(", ", String(item.soGhe));
      }
    });

    return kq;
  };
  const tongTien = () => {
    if (gheChon.length === 0) {
      return 0;
    } else {
      return props.thongTinChuyenXe.giaVe * gheChon.length;
    }
  };
  const handleErrors=(err,values)=>{
    if(err.length>0){
      settiepTuc(true)
    }
    else{
      settiepTuc(false)
      setthongTin(values)
    }

  }

  
 
  
  return (
    <Fragment>
      <Header />
      <div className="DatVe">
        <div className="DatVe__header">
          <DatVeStepper activeStep={activeStep} />
        </div>
        <div className="DatVe__box row">
          <div className="box__left col-4">
            <div className="left__top">
              <h5>
                {props.thongTinChuyenXe.tuyen &&
                  `${props.thongTinChuyenXe.tuyen.to.ten} - ${
                    props.thongTinChuyenXe.tuyen.from.ten
                  }:    ${moment(props.thongTinChuyenXe.ngayDi).format(
                    "DD/MM"
                  )}`}
              </h5>
              <ComboBox_DanhSachTram />
              <div className="top__datve">
                <div className="datve__soghe">
                  <h5 className="soghe__heading">Số Ghế:</h5>
                  <div className="soghe__content">{showGhe()}</div>
                </div>
                <div className="datve__tongtien">
                  <h5 className="tongtien__heading">Tổng Tiền:</h5>
                  <div className="tongtien__content">
                    {tongTien().toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                </div>
              </div>
              <div className="top__handle">
                <Button
                  variant="contained"
                  color="primary"
                  className="outline mr-1"
                  onClick={handleBack}
                  disabled={activeStep < 1}
                >
                  Quay lại
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className="outline ml-1"
                  onClick={handleNext}
                  disabled={tiepTuc}
                >
                  Tiếp tục
                </Button>
              </div>
            </div>
            <div className="left__bottom">
              <h5>Thông tin chuyến xe</h5>
              <div className="bottom_content">
                <div className="content__DiemDi content__item">
                  <LocationOnIcon />{" "}
                  <span>
                    <strong>
                      {props.thongTinChuyenXe.tuyen &&
                        props.thongTinChuyenXe.tuyen.to.ten}
                    </strong>
                    {props.thongTinChuyenXe.ngayDi &&
                      moment(props.thongTinChuyenXe.ngayDi).format(
                        "HH:MM DD/MM/YYYY"
                      )}
                  </span>
                </div>
                <div className="content__DiemDen content__item">
                  <LocationOnIcon />{" "}
                  <span>
                    <strong>
                      {props.thongTinChuyenXe.tuyen &&
                        props.thongTinChuyenXe.tuyen.from.ten}
                    </strong>
                    {props.thongTinChuyenXe.ngayDen &&
                      moment(props.thongTinChuyenXe.ngayDen).format(
                        "HH:MM DD/MM/YYYY"
                      )}
                  </span>
                </div>
                <div className="content__DaiLy content__item">
                  <AirportShuttleIcon />{" "}
                  <span>
                    <strong>
                      {props.thongTinChuyenXe.daiLy &&
                        props.thongTinChuyenXe.daiLy.ten}
                    </strong>
                  </span>
                </div>
                <div className="content__Phone content__item">
                  <CallIcon />{" "}
                  <span>
                    <strong>
                      {props.thongTinChuyenXe.daiLy &&
                        props.thongTinChuyenXe.daiLy.dienThoai}
                    </strong>
                  </span>
                </div>
                <div className="content__Phone content__item">
                  <MoneyIcon />{" "}
                  <span>
                    <strong>
                      {props.thongTinChuyenXe.giaVe &&
                        `${props.thongTinChuyenXe.giaVe}  VND/Vé`}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="box_right col-8">{activeStep === 0 && <Xe />}
          {activeStep === 1 && <ThongTinKhachHang handleErrors={handleErrors} values={thongTin}  />}
          {activeStep === 2 && <ThanhToan />}
          </div>
        </div>
      </div>

      <div></div>

      <Backdrop className={classes.backdrop} open={!props.loaded}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Footer />
    </Fragment>
  );
}
const mapDispatchToProps = (dispatch) => ({
  layThongTinChuyenXe: (chuyenXeID) =>
    dispatch(thongTinChuyenXe_request_action(chuyenXeID)),
});
const mapStateToprops = (state) => ({
  loaded: state.datVeReducer.loaded,
  // thongTinChuyenXe: {},
  thongTinChuyenXe: state.datVeReducer.thongTinChuyenXe,
  danhSachGhe: state.datVeReducer.danhSachGhe,
});

export default connect(mapStateToprops, mapDispatchToProps)(DatVe);
