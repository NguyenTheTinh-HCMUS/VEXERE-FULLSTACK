import React from 'react'
import AirlineSeatFlatIcon from '@material-ui/icons/AirlineSeatFlat';
import { makeStyles } from '@material-ui/core/styles';
import './style.scss'
import {trangThaiGhe} from '../../constants/index'
import {connect} from 'react-redux'
import {HandleGhe_Action} from '../../redux/actions/datve.action'
const useStyles = makeStyles((theme) => ({
    ghe:{
        width:50,
        height:50
    },
    root:{
        marginRight:10
    }
  }));
 function Ghe(props) {
    const classes = useStyles();
    const colorGhe=()=>{
        if(props.thongTin.status){
            if(props.thongTin.status===trangThaiGhe[0]){
                return 'ghe-trong'
            }
            else if(props.thongTin.status===trangThaiGhe[1]){
                return 'ghe-khongTrong'
            }
            else if(props.thongTin.status===trangThaiGhe[2]){
                return 'ghe-cam'
            }
            else if(props.thongTin.status===trangThaiGhe[3]){
                return 'ghe-chon'
            }
        }
        return ''
    }
    const handleGhe=()=>{
        if(props.thongTin.status!==trangThaiGhe[1] && props.thongTin.status!==trangThaiGhe[2]){
            props.changeStateSeat(props.thongTin)
        }
    }
    return (
        <div className={classes.root} onClick={handleGhe}>
            <AirlineSeatFlatIcon  className={classes.ghe+' ghe '+colorGhe()}   />
        </div>
    )
}
const mapDispatchToProps=dispatch=>({
    changeStateSeat: (thongTin)=>dispatch(HandleGhe_Action(thongTin)) 
})
export default connect(null,mapDispatchToProps)(Ghe)
