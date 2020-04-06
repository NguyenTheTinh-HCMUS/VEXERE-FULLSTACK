import React from 'react'
import {connect} from 'react-redux'
import ChuyenXe from '../chuyen-xe';
 function DanhSachChuyenXe(props) {
    return (
        <div>
            {props.ds_hienThi.length>0 &&
            props.ds_hienThi.map((item,index)=>
            <ChuyenXe key={index} thongTin={item}  />
            )
            }
            
        </div>
    )
}
const mapStateToProps = (state) => ({
    ds_hienThi: state.timChuyenXe.ds_hienThi
  });

export default connect(mapStateToProps,null)(DanhSachChuyenXe)
