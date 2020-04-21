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
import io from 'socket.io-client'
import {SOCKET_SERVER} from '../../constants/config.api'
import {chonGhe_action,boGhe_action,createSocket_action,huyTatGhe_action} from '../../redux/actions/datve.action'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import {POST_DATVE} from '../../constants/config.api'
import callApI,{callAPPIWithToken} from '../../utils/callApi'
import Snackbar from '@material-ui/core/Snackbar';
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
  const [thongTin, setthongTin] = useState({
    hoTen: "" ,
    email:"" ,
    soDienThoai:"" 
  })
  const [snackBar, setsnackBar] = useState(false)

  // socket io
  useEffect(() => {
    props.createSocket(io(SOCKET_SERVER))
  }, [])
  useDidMountEffect(() => {
  
    if(props.gheChon){
   
    props.socket.emit('chon-ghe-client',{
      _id: props.gheChon._id,
      chuyenXe: props.match.params.id
    })
    }
  
  }, [props.gheChon])

  useDidMountEffect(() => {
    if(props.gheBo){
     
      props.socket.emit('ghe-bo-client',{
        _id: props.gheBo._id,
        chuyenXe: props.match.params.id
      })
    }
   
  }, [props.gheBo])
  useEffect(() => {
    if(props.socket){
      props.socket.on('chon-ghe-server',(data)=>{
        if(data.chuyenXe===props.match.params.id){
          props.chonGhe(data._id)
        }
       
      })
      props.socket.on('ghe-bo-server',(data)=>{
        if(data.chuyenXe===props.match.params.id){
          props.boGhe(data._id)
        }
        
      })
      props.socket.on('huy-tat-ghe-server',data=>{
        if(data.chuyenXe===props.match.params.id){
          props.huyTatGhe(data.dsGhe)

        }
      
      })
    }
  }, [props.socket])
  // 
  const handleNext = () => {
    if(activeStep<=1){
      if (activeStep === 0) {
        if (localStorage.getItem("TAIKHOAN")) {
          setActiveStep((prevActiveStep) => prevActiveStep + 2);
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        return;
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      if(localStorage.getItem('TAIKHOAN')){
        callAPPIWithToken('POST',POST_DATVE,{
          ds_ghe:props.danhSachGhe.filter(item=>item.status===trangThaiGhe[3]).map(item=>item._id),
          chuyenXe: props.match.params.id,
          tram:props.tram._id,
          taiKhoan: JSON.parse(localStorage.getItem('TAIKHOAN'))._id
        },{
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('TAIKHOAN')).access_token}`
      }).then(res=>{
        setTimeout(() => {
         
          // props.history.push('/')
          window.location.href='/'
        }, 2000);
       
        setsnackBar(true)

      }).catch(error=>console.log(error))

      }
      else{
       
        callApI('POST',POST_DATVE,{
          ds_ghe:props.danhSachGhe.filter(item=>item.status===trangThaiGhe[3]).map(item=>item._id),
          chuyenXe: props.match.params.id,
          tram:props.tram._id,
          thongTin:thongTin
        }).then(res=>{
          setTimeout(() => {
            
            window.location.href='/'
          }, 2000);
          setsnackBar(true)

        }).catch(erro=>console.log(erro))
      }
    }
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
                  disabled={activeStep < 1 || activeStep>=3}
                >
                  Quay lại
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className="outline ml-1"
                  onClick={handleNext}
                  disabled={tiepTuc || activeStep>=3}
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
          {activeStep >= 2 && <ThanhToan />}
          </div>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'right' }}
       
        open={snackBar}
       
        message="Chúc mừng bạn đặt vé thành công! Vui lòng check lại mail."
        
      />

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
  chonGhe:_id=>dispatch(chonGhe_action(_id)),
  boGhe:_id=>dispatch(boGhe_action(_id)),
  createSocket:socket=>dispatch(createSocket_action(socket)),
  huyTatGhe:data=>dispatch(huyTatGhe_action(data))
});
const mapStateToprops = (state) => ({
  loaded: state.datVeReducer.loaded,
  thongTinChuyenXe: state.datVeReducer.thongTinChuyenXe,
  danhSachGhe: state.datVeReducer.danhSachGhe,
  gheChon:  state.datVeReducer.gheChon,
  gheBo: state.datVeReducer.gheBo,
  socket: state.datVeReducer.socket,
  tram: state.datVeReducer.tram
});

export default connect(mapStateToprops, mapDispatchToProps)(DatVe);
