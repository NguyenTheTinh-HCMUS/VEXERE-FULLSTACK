import React, { Fragment, useState, useEffect } from "react";
import Header from "../../components/header";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { thongTinChuyenXe_request } from "../../redux/actions/timchuyenxe.action";
import "./style.scss";
import BoLoc from "../../components/BoLoc";
import Sort from "../../components/sort";
import DanhSachChuyenXe from "../../components/danh-sach-chuyen-xe";
import io from 'socket.io-client'
import {SOCKET_SERVER} from '../../constants/config.api'
import {Like_Socket} from '../../redux/actions/timchuyenxe.action'


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root_chuyenXe:{
    marginTop:80,
    paddingTop:'2rem'
  }
}));
function TimChuyenXe(props) {
  const classes = useStyles();
  const [socket, setsocket] = useState(null)
  useEffect(() => {
    setsocket(io(SOCKET_SERVER))
    props.thongTinChuyenXe_request(
      props.match.params.tuyenDuong,
      props.match.params.ngayDi
    );
  }, []);
  useEffect(() => {
    if(socket){
      socket.on('Handle-Like-Server',like=>{
     
        props.Like_Action(like)
      })
    }
   
  }, [socket])
  useEffect(() => {
    if(props.soketLike){
      socket.emit('Handle-Like-Client',props.soketLike)
     
    }
  }, [props.soketLike])
  return (
    <Fragment>
      <Header />
      <div className={`ds_chuyenxe container ${classes.root_chuyenXe}`}>
      <div className='box-boloc'>
      <div className='header-boloc'>
          <p>Bộ lọc tìm kiếm</p>
          <p className='xoaloc'>Xóa lọc</p>
        </div>
        <div className="boloc">
          <BoLoc />
        </div>
      </div>
        <div className="box-chuyenxe">
            <h4>Vé Xe khách từ {props.thongTinChuyenXe.tuyenXe && props.thongTinChuyenXe.tuyenXe.to.ten} đi {props.thongTinChuyenXe.tuyenXe && props.thongTinChuyenXe.tuyenXe.from.ten}: {props.ds_hienThi && props.ds_hienThi.length } Chuyến</h4>
            <div className='sapxep'>
                <p>Sắp xếp theo: </p>
               
                    <Sort titile='Giá'/>
                    <Sort titile='Ngày'/>
               

            </div>
            <div className='danhsachxe'>
          
          <DanhSachChuyenXe />
          </div>
        </div>
      </div>

      <Backdrop className={classes.backdrop} open={!props.loaded}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}
const mapStateToProps = (state) => ({
  loaded: state.timChuyenXe.loaded,
  thongTinChuyenXe: state.timChuyenXe.thongTinChuyenXe,
  ds_hienThi: state.timChuyenXe.ds_hienThi,
  soketLike:  state.timChuyenXe.soketLike
});
const mapDispatchToProps = (dispatch) => ({
  thongTinChuyenXe_request: (tuyenDuong, ngayDi) =>
    dispatch(thongTinChuyenXe_request(tuyenDuong, ngayDi)),
    Like_Action: like=>dispatch(Like_Socket(like))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimChuyenXe);
