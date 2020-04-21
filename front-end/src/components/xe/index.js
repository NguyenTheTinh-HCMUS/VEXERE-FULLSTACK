import React from 'react'
import {connect} from 'react-redux'
import Xe40 from '../xe40'
import Xe60 from '../xe60'
import Xe16 from '../xe16'
import './style.scss'
function Xe(props) {
    const locXe=(sucChua)=>{
        if(sucChua===40){
            return <Xe40 />
        }
        else if(sucChua===60){
            return <Xe60 />
        }
        else if(sucChua===16){
            return <Xe16 />
        }
    }
    return (
        <div className='xe'>
            <div className='xe__loaixe'>
            {props.thongTin.xe && locXe(props.thongTin.xe.loaiXe.sucChua)}
            </div>
            <div className='xe__chuthich'>
                <div className='chuthich__trong chuthich__item'>
                    <div className='trong__mau '>
                    </div>
                    <div className='trong__heading'>
                        Ghế Trống
                    </div>
                </div>
                 <div className='chuthich__chon chuthich__item'>
                    <div className='chon__mau '>
                    </div>
                    <div className='chon__heading'>
                        Ghế Chọn
                    </div>
                </div>

                <div className='chuthich__khongTrong chuthich__item'>
                    <div className='khongTrong__mau '>
                    </div>
                    <div className='khongTrong__heading'>
                        Ghế có người
                    </div>
                </div>
                <div className='chuthich__cam chuthich__item'>
                    <div className='cam__mau '>
                    </div>
                    <div className='cam__heading'>
                        Ghế xử lí
                    </div>
                </div>

            </div>
        </div>
    )
}
const mapStateToProps=state=>({
    thongTin: state.datVeReducer.thongTinChuyenXe
})
export default connect(mapStateToProps,null) (Xe)
