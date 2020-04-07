import React from "react";
import SliderCustom from "../Slider";
import SimpleRating from '../rating/index'
import './style.scss'
export default function BoLoc() {
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
      />

      </div>

      <div className='item'>
      <SliderCustom
        default={[0, 2000000]}
        title={"Giá"}
        min={0}
        max={2000000}
        step={10000}
      />

      </div>
      <div className='item'>
      <SliderCustom
        default={[0, 60]}
        title={"Chỗ trống"}
        min={0}
        max={60}
        step={10}
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
}
