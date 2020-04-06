import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles'
import './style.scss'
import Rating from '@material-ui/lab/Rating';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import moment from 'moment'
const useStyle=makeStyles(them=>({
    avatar: {
        width: 70,
        height: 70,
        margin: '0 auto'
    },
    like:{
        cursor: 'pointer'
    }
    
}))




export default function DanhGia(props) {
    const classes=useStyle()
    const [like, setlike] = React.useState(props.like||false)
    const handleLike=()=>{
        // console.log(like)
        setlike(prev=>!prev)
    }
    console.log(props.danhGia)
    return (
        <div className='danh-gia row'>
            <div className='danh-gia__avatar col-3'>
            <Avatar className={classes.avatar}  alt="Remy Sharp" src={props.danhGia.taiKhoan.hinhAnh} />
    <p>{props.danhGia.taiKhoan.ten}</p>
            </div>
            <div className='danh-gia__content col-9'>
            <Rating name="read-only" value={props.danhGia.sao} readOnly />
    <p className='content__ngay'>{moment(props.danhGia.ngay).fromNow()}</p>
    <p className='content__text'>{props.danhGia.noiDung}</p>
           <div className='content__like'>
           <ThumbUpAltIcon className={like ? `${classes.like} like__thum thum--blue` : `${classes.like} like__thum`}
           onClick={handleLike}
           /> 
           <span className='like__number'>{props.danhGia.ds_Like.length}</span>

           </div>
            


            </div>

            
        </div>
    )
}
