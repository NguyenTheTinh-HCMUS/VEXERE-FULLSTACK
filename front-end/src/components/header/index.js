import React from "react";
import "./style.scss";
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import{Button} from '@material-ui/core'
import '../scss/index.scss'
import AuthMenu from "../auth-header";
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
  },
  div: {
    position: 'absolute',
    top: 50,
    right: 0,
    
    minWidth:420,
    zIndex:1000,
   
    padding: theme.spacing(1),
    // backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: '0 8px 6px -6px black',
    backgroundColor: 'white',
    color:'#41494e'
  },
}));

export default function Header() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen(prev => !prev);
    };
  
    const handleClickAway = () => {
      setOpen(false);
    };
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Link to='/'>
            <img src="https://storage.googleapis.com/fe-production/icon_vxr_full.svg" />
            </Link>
           
          </div>
          <div className="col-9">
            <div className="danhmuc">
              <ul>
                <li>Quản lí vé</li>
                <li>Ứng dụng</li>
                <li>Ưu điểm</li>
                <li>
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <div className={classes.wrapper}>
                        {/* <Button variant="contained">Default</Button> */}
                      <Button  onClick={handleClick} variant="contained" className='outline' >
                        Hostline
                      </Button>
                      {open ? (
                        <div className={classes.div}>
                            <ul>
                                <li>1900 - 8888 -43 để được đặt vé online</li>
                                <li>1900 - 8886 -84 để được đặt vé qua điện thoại</li>
                                <li>1900 - 9090 -81 để phản hồi về dịch vụ và sự cố lỗi</li>
                            </ul>
                        </div>
                      ) : null}
                    </div>
                  </ClickAwayListener>
                </li>
             <li className='auth'>
               <AuthMenu />
             </li>
              </ul>
            </div>
         
          </div>
        </div>
      </div>
    </header>
  );
}
