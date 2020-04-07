import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "../scss/index.scss";
import { Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import "../scss/index.scss";
import { Avatar, Tooltip } from "@material-ui/core";
import { TAIKHOAN } from "../../constants/localStore.constant";
import Dialog from "../digalog/index";
import { useState } from "react";
import Badge from "@material-ui/core/Badge";
const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0
    }
  }
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  paper: {
    marginRight: theme.spacing(2)
  },
  tab: {
    zIndex: 1000
  }
}));

export default function AuthMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setopenDialog] = useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const hadleDangXuat = () => {
    setopenDialog(true);
  };
  const handleOk = () => {
    localStorage.clear(TAIKHOAN);
    window.location.reload();
  };
  const avatarSrc = () => {
    if (localStorage.getItem(TAIKHOAN)) {
      const src = JSON.parse(localStorage.getItem(TAIKHOAN)).hinhAnh;
      if (src.startsWith("http")) {
        return src;
      } else {
        return "http://" + src;
      }
    }
    return "";
  };
  return (
    <div className={classes.root}>
      <Tooltip
        title={
          localStorage.getItem(TAIKHOAN)
            ? JSON.parse(localStorage.getItem(TAIKHOAN)).ten
            : ""
        }
        placement="left-start"
      >
        <div ref={anchorRef} onClick={handleToggle}>
         {localStorage.getItem(TAIKHOAN) ?  <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            variant="dot"
          >
            <Avatar src={avatarSrc()} />
          </StyledBadge>
        : 
        <Avatar  />
        }
        </div>
      </Tooltip>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className={classes.tab}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {!localStorage.getItem(TAIKHOAN) && (
                    <Link to="/auth/login" className="custom_aTag">
                   
                      <MenuItem onClick={handleClose}>Đăng Nhập</MenuItem>
                    </Link>
                  )}
                  {!localStorage.getItem(TAIKHOAN) && (
                     <Link to="/auth/signup" className="custom_aTag">
                   
                   <MenuItem onClick={handleClose}>Đăng Ký</MenuItem>
                   </Link>

                   
                  )}

                  {localStorage.getItem(TAIKHOAN) && (
                    <MenuItem>Tài Khoản</MenuItem>
                  )}
                  {localStorage.getItem(TAIKHOAN) && (
                    <MenuItem onClick={hadleDangXuat}>Đăng Xuất</MenuItem>
                  )}
                  <Dialog
                    open={openDialog}
                    thongBao={"Bạn chắc chắn đăng xuất?"}
                    handleClose={() => setopenDialog(false)}
                    handleOk={handleOk}
                  />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
