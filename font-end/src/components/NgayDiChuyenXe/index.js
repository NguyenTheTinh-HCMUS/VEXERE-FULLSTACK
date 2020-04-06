import React, { useState, useEffect ,useRef} from "react";
import "./style.scss";
import "../scss/index.scss";
import {connect} from 'react-redux'
import {reset_diaDiem} from '../../redux/actions/trangchu.action'
function NgayDiChuyenXe(props) {
  const [dropdown, setdropdown] = useState(false);
  const [items, setItems] = useState(props.ds_ngay)
  const inputRef=useRef(null)
  useEffect(() => {
    document.addEventListener("click", outsideClickListener);
    return () => {
      document.removeEventListener("click", outsideClickListener);
    };
  }, []);
  useEffect(() => {
    inputRef.current.value=''
  }, [props.ds_diaDiemDen])
  useEffect(() => {
    inputRef.current.value=''
  }, [props.ds_Ngay])

  const outsideClickListener = e => {
    if (!document.getElementById(props.id).contains(e.target)) {
      setdropdown(false);
    }
  };
  const handleChoose = item => {
    setdropdown(false);
    inputRef.current.value=item
    props.choosePlace(item);
  };
 
  const returnList=()=>{
      
      if(props.ds_ngay.length===0){
          return   <li >
             Vui lòng chọn nơi đến
        </li>
      }
    
       return props.ds_ngay.map((item, index) => (
          <li onClick={() => handleChoose(item)} key={index}>
            {item}
          </li>
        ))

  }
  const handlOnblur=(e)=>{
    // const index=props.ds_diaDiem.findIndex(item=>item.ten===e.target.value)
    // if(index<0){
    //   if(e.target.value!=''){
    //     e.target.value=props.ds_diaDiem[0].ten
    //     props.choosePlace(props.ds_diaDiem[0]);
    //   }
    //   else if(props.type==='di'){
    //     props.reset(1)
    //   }
    // }
    // else{
    //   props.choosePlace(props.ds_diaDiem[index])
    // }
    // setItems(props.ds_diaDiem)
    // console.log(e.currentTarget)
  }
  const handlOnchange=(e)=>{
    // let result=props.ds_diaDiem.filter(item=> item.ten.toLowerCase().indexOf(e.target.value.toLowerCase())>=0)
    // setItems(result)
  }
  const handleForcus=(e)=>{
    // setItems(props.ds_diaDiem)
    // if(props.ds_diaDiem.findIndex(item=>e.target.value===item.ten)<0){
    //   e.target.value=''
    // }
  }
  return (
    <div className="diadiem" id={props.id}>
      <div
        className="input"
        onClick={() => {
          setdropdown(true);
        }}
      >
       <i className="fa fa-calendar"></i>
        <input type="type" placeholder={'Ngày đi'} className="outline" ref={inputRef} 
        onChange={handlOnchange} onBlur={handlOnblur} onFocus={handleForcus}
        />
      </div>
      {dropdown && (
        <ul className="dropdown">
          {props.ds_ngay.length>0 ?   returnList() :
            <li>Không có ngày của chuyến đi</li>
          }
        </ul>
      )}
    </div>
  );
}
const mapDispatchToprops=dispatch=>({
  reset: (pos)=>dispatch(reset_diaDiem(pos))
})
const mapStateToProps=state=>({
  ds_diaDiemDen: state.trangChuReducer.ds_diaDiemDen,
  ds_Ngay: state.trangChuReducer.ds_Ngay
})

export default connect(mapStateToProps,mapDispatchToprops) (NgayDiChuyenXe)




