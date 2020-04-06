import React from 'react'
import DanhGia from '../danh-gia'

export default function DanhSachDanhGia(props) {
    console.log(props.danhSach)
    return (
        <div className='comment-list'>
            {(props.danhSach && props.danhSach.length>0) ?
            props.danhSach.map((item,index)=>   <DanhGia key={index} danhGia={item}  />): 'Không có bình luận' }
          
            
        </div>
    )
}
