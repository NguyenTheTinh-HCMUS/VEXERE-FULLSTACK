import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles'
import './style.scss'
import Rating from '@material-ui/lab/Rating';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import moment from 'moment'
import callApi from '../../utils/callApi'
import {POST_LIKE} from '../../constants/config.api'
import {Like_Action} from '../../redux/actions/timchuyenxe.action'
import {connect} from 'react-redux'

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




 function DanhGia(props) {
    const classes=useStyle()
    const [like, setlike] = React.useState(props.like||false)
  
    React.useEffect(() => {
    
        
    if(localStorage.getItem('TAIKHOAN')  ){
        const pos= props.danhGia.ds_Like.findIndex(item=>
            item===JSON.parse(localStorage.getItem('TAIKHOAN'))._id)
        if(pos>-1){
            setlike(true)
        }
        else{
            setlike(false)
        }
      
    }
    else{
        setlike(false)
    }
    }, [])
    React.useEffect(() => {
        if(localStorage.getItem('TAIKHOAN')  ){
            const pos= props.danhGia.ds_Like.findIndex(item=>
                item===JSON.parse(localStorage.getItem('TAIKHOAN'))._id)
            if(pos>-1){
                setlike(true)
            }
            else{
                setlike(false)
            }
          
        }
        else{
            setlike(false)
        }
      
        }, [props.ds_hienThi])
   
    const handleLike=()=>{
        // console.log(like)
        // setlike(prev=>!prev)
        if(localStorage.getItem('TAIKHOAN')){
            callApi('POST',POST_LIKE,{
                danhGia: props.danhGia._id,
                taiKhoan: JSON.parse(localStorage.getItem('TAIKHOAN'))._id
            }).then(
                res=>{
                   
                    props.handleLike({
                        xe: props.xe,
                        danhGia: res.data
                    })
                    // setlike(prev=>!prev)
                }
            ).
            catch(err=>console.log(err))

        }
        else{

        }
        
    }
    // console.log(props.danhGia)
    return (
        <div className='danh-gia row'>
            <div className='danh-gia__avatar col-3'>
            <Avatar className={classes.avatar}  alt="Remy Sharp" 
            src={props.danhGia.taiKhoan.hinhAnh.startsWith("http")?props.danhGia.taiKhoan.hinhAnh: `http://${props.danhGia.taiKhoan.hinhAnh}`} />
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

const dispatchToProps=dispatch=>({
    handleLike: danhGia=>dispatch(Like_Action(danhGia))
})
const mapDispatchToProps=state=>({
    ds_hienThi:  state.timChuyenXe.ds_hienThi
})
export default connect(mapDispatchToProps,dispatchToProps) (DanhGia)