import React from 'react'
import DanhGia from '../danh-gia'
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyle=makeStyles(()=>({
    list:{
        maxHeight: 400,
        overflowY:'auto',
        overflowX:'hidden'
    }
}))


export default function DanhSachDanhGia(props) {
    const classes=useStyle()
    return (
        <div className={`comment-list ${classes.list}`}>
            {(props.danhSach && props.danhSach.length>0) ?
            props.danhSach.map((item,index)=>   <DanhGia key={index} danhGia={item} 
            xe={props.xe}
            
            
            />): 'Không có bình luận' }
            
        </div>
    )
}

