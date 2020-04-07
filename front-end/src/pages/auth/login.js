import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';


import { makeStyles } from "@material-ui/core/styles";
import callApI from "../../utils/callApi";
import * as localStore from "../../constants/localStore.constant";
import { Link } from "react-router-dom";
import Header from "../../components/header";




import EmailDialog from "../../components/dialog-email";
import CustomizedSnackbars from '../../components/snackbars/index'

import  * as URL from '../../constants/config.api'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    backgroundImage:
      'url("https://images.unsplash.com/photo-1541442510208-33bf9a34886f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60")',
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

export default function Login(props) {
  const [form, setFrom] = useState({
    email: "",
    matKhau: ""
  });
  const [dialog, setdialog] = useState(false)
  const [backDrop, setbackDrop] = useState(false)
  const [snackBar, setsnackBar] = useState({
    open: false,
    severity: '',
    message: ''
  })
  const [alert, setalert] = useState(false)
  const classes = useStyles();
  const handleOnchange = e => {
    const { value, name } = e.target;
    setFrom(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    callApI("POST",URL.POST_TAIKHOAN_DANGNHAP, form)
      .then(res => {
        localStorage.setItem(localStore.TAIKHOAN, JSON.stringify(res.data));
        setFrom({
          email: "",
          matKhau: ""
        });
        if (props.location.path !== "/aut/signup") {
          props.history.push("/");
        } else {
          props.history.goBack();
        }
      })
      .catch(err => {
        setalert(true)
        console.log(err.message)});
  };
  const handleOkDialog=(emailValue)=>{
    setdialog(false)
    setbackDrop(true)
    callApI('POST',URL.POST_XACNHANMAIL_GUIMAIL,{email: emailValue}).then(result=>{
      setbackDrop(false)
      setsnackBar({
        open: true,
        severity: 'success',
        message: 'Kiểm tra lại mail để reset mật khẩu.'
      })


    }).catch(err=>{
      console.log(err)
      setbackDrop(false)
      setsnackBar({
        open: true,
        severity: 'error',
        message: 'Email lỗi hoặc chưa tồn tại trong hệ thống.'
      })
    })


  }

  return (
    <div>
      <Header />
      <Grid container component="main" className={classes.root}>
     
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
          {alert && <Alert severity="error">Kiểm tra lại email hoặc mật khẩu của bạn</Alert>}
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={form.email}
                onChange={handleOnchange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="matKhau"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={form.matKhau}
                onChange={handleOnchange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                <p style={{color: 'blue', cursor: 'pointer'}}
                onClick={()=>setdialog(true)}
                >
        Forgot password?
      </p>
                </Grid>
                <Grid item>
                  <Link to="/auth/signup">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
      <EmailDialog open={dialog} handleClose={()=>setdialog(false)} email={form.email} handleOk={handleOkDialog} />
      <Backdrop className={classes.backdrop} open={backDrop} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CustomizedSnackbars open={snackBar.open} handleClose={()=>setsnackBar(prev=>({...prev,open: false}))}
      
      severity={snackBar.severity}
      message={snackBar.message}
      times={3000}
      />
    </div>
  );
}
