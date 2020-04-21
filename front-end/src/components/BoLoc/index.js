import React from "react";
import SliderCustom from "../Slider";
import SimpleRating from '../rating/index'
import './style.scss'
import {connect} from 'react-redux'
import {LocGio_action,LocGia_action,LocCho_action} from '../../redux/actions/timchuyenxe.action'
const mapDispatchToProps=dispatch=>({
  handleGio: (rangeValues)=>dispatch(LocGio_action(rangeValues)),
  handleGia: (rangeValues)=>dispatch(LocGia_action(rangeValues)),
  handleCho:  (rangeValues)=>dispatch(LocCho_action(rangeValues))
})

const BoLoc=connect(null,mapDispatchToProps) (function (props) {
  return (
    <div className='items'>
        <h5>Tiêu chí phổ biến</h5>
        <div className='item'>
      <SliderCustom
        default={[0, 23]}
        title={"Giờ đi"}
        min={0}
        max={23}
        step={1}
        handleChange={(values)=>props.handleGio(values)}
        key='gio-slider'
      />

      </div>

      <div className='item'>
      <SliderCustom
        default={[0, 2000000]}
        title={"Giá"}
        min={0}
        max={2000000}
        step={10000}
        key='gia-slider'
        handleChange={props.handleGia}
      />
      </div>

      
      <div className='item'>
      <SliderCustom
        default={[0, 60]}
        title={"Sức Chứa"}
        min={0}
        max={60}
        step={10}
        key='cho-slider'
        handleChange={props.handleCho}
      />

</div>
<div className='item'>
<SimpleRating
      default={1}
      title={'Đánh giá'}
      
      />

</div>


    

     
    
    </div>
  );
})
export default BoLoc
