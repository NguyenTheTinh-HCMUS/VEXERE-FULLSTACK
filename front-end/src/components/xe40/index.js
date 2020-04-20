import React from 'react'
import Ghe from '../ghe'
import {connect} from 'react-redux'
import './style.scss'
function Xe40(props) {
    return (
        <div className='xe40'>
            <div className='xe40__tang2'>
                <p>Tầng 2</p>
                <div className='tang2__dayA tang2__item'>
                    <p>A</p>
                    {props.danhSachGhe &&  props.danhSachGhe.slice(20,30).map((item)=><Ghe key={item._id} thongTin={item} />)}
                </div>
                <div className='tang2__dayB tang2__item'>
                <p>B</p>
                {props.danhSachGhe &&  props.danhSachGhe.slice(30,40).map((item)=><Ghe key={item._id} thongTin={item} />)}
                </div>
            </div>
            <div className='xe40__tang1'>
                <p>Tầng 1</p>
                <div className='tang1__dayA tang1__item'>
                    <p>A</p>
                    {props.danhSachGhe &&  props.danhSachGhe.slice(0,10).map((item)=><Ghe key={item._id} thongTin={item} />)}
                </div>
                <div className='tang1__dayB tang1__item'>
                <p>B</p>
                {props.danhSachGhe &&  props.danhSachGhe.slice(10,20).map((item)=><Ghe key={item._id} thongTin={item} />)}
                </div>
            </div>
            
        </div>
    )
}
const mapStateToProps=state=>({
    danhSachGhe: state.datVeReducer.danhSachGhe
})
export default connect(mapStateToProps,null) (Xe40)
