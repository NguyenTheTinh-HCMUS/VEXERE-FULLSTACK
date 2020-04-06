
import React,{useState,useEffect} from "react";
import "./style.scss";
import DiaDiem from "../DiaDiem";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import "../scss/index.scss";
import {get_ds_diaDiem_request,get_ds_DiaDiemDen_request,dispatch_ngayDi,choose_ngayDi} from '../../redux/actions/trangchu.action'
import {connect} from 'react-redux'
import NgayDiChuyenXe from '../../components/NgayDiChuyenXe/index'
function DatVe(props) {
  const [openItem, setopenItem] = useState(0)
  
  useEffect(() => {
    props.get_ds_diaDiem_request()
  }, [])
    const [checkSerach, setcheckSerach] = useState(false)
    const handleNoiDi=(abc)=>{
      props.get_ds_DiaDiemDen_request(abc._id)
      setopenItem(1)
    }
    const handleNoiDen=(abc)=>{

      props.dispatch_ngayDi(abc._id)
    }
 const handlOnclick=()=>{
  setcheckSerach(true)
  props.timChuyenXe(props.tuyen , props.ngayDi)
 }
  return (
    <div id="datve">
      <div className="image">
        <img src="https://static.vexere.com/production/banners/330/neu-ban-phai-di.png" />
      </div>
      <div className="thongtin">
        <h1>VeXeRe.com - Hệ thống đặt vé xe khách lớn nhất Việt Nam</h1>
        <div className='thanh-search-container'>
          <div className="thanh-search">
            <div className="thanh-search--item">
              <DiaDiem choosePlace={abc =>handleNoiDi(abc)} id="diemdi" ds_diaDiem={props.ds_diaDiem} type={'di'} />
            </div>

            <div className="thanh-search--item">
              <DiaDiem choosePlace={abc => handleNoiDen(abc)} id="diemden"  ds_diaDiem={props.ds_diaDiemDen.ds_diemDen ?  props.ds_diaDiemDen.ds_diemDen : [] } type={'den'} />
            </div>
            <div className="thanh-search--item">
              <NgayDiChuyenXe choosePlace={abc => props.choose_ngayDi(abc)}  ds_ngay={props.ds_Ngay } type={'den'}  id="ngay" />
            </div>
            <div className="thanh-search--item">
              <Button
                variant="contained"
                color="secondary"
                className="search-button outline"
                onClick={handlOnclick}
                disabled={(props.tuyen && props.ngayDi)? false : true }
              >
                {checkSerach ?  <CircularProgress /> : 'Tìm Vé'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps=dispatch=>({
  get_ds_diaDiem_request: ()=>dispatch(get_ds_diaDiem_request()),
  get_ds_DiaDiemDen_request: (id)=>dispatch(get_ds_DiaDiemDen_request(id)),
  dispatch_ngayDi: (_id)=>dispatch(dispatch_ngayDi(_id)),
  choose_ngayDi: (ngay)=>dispatch(choose_ngayDi(ngay))
})
const mapStateToProps=state=>({
  ds_diaDiem:state.trangChuReducer.diaDiem,
  ds_diaDiemDen: state.trangChuReducer.ds_diaDiemDen,
  ds_Ngay: state.trangChuReducer.ds_Ngay,
  tuyen: state.trangChuReducer.tuyen,
  ngayDi: state.trangChuReducer.ngayDi,

})
export default connect(mapStateToProps,mapDispatchToProps) (DatVe)