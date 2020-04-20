import React from 'react'
import Ghe from '../ghe'
import {connect} from 'react-redux'
import './style.scss'
function Xe16(props) {
    return (
        <div className='xe16'>

            
                <div className='xe16__dayA xe16__item'>
                    <p>A</p>
                    {props.danhSachGhe &&  props.danhSachGhe.slice(0,8).map((item)=><Ghe key={item._id} thongTin={item} />)}
                </div>
                <div className='xe16__dayB xe16__item'>
                <p>B</p>
                {props.danhSachGhe &&  props.danhSachGhe.slice(8,16).map((item)=><Ghe key={item._id} thongTin={item} />)}
                </div>
           
         
            
        </div>
    )
}
const mapStateToProps=state=>({
    danhSachGhe: state.datVeReducer.danhSachGhe
})
export default connect(mapStateToProps,null) (Xe16)
