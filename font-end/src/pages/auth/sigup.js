import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {callAPIWithFileData} from '../../utils/callApi'
import {POST_DangKy} from '../../constants/config.api'
import CustomizedSnackbars from '../../components/snackbars/index'
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginBottom: '1rem'
   
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root:{
     
  }
}));

export default function SignUp(props) {
    const [form, setform] = React.useState({
        ten:'',
        email: '',
        matKhau: '',
        dienThoai:''
    })
    const [file, setfile] = React.useState(null)
    const [snack, setSnack] = React.useState({
        open: false,
        message:'Đăng ký tài khoản thành công!',
        severity: 'success'
    })
  const classes = useStyles();
  const handleOnchange=(e)=>{
    const {name,value}=e.target
    setform(prev=>({
        ...prev,
        [name]: value
    }))
}
const handleFileOnchange=(e)=>{
    setfile(
         e.target.files[0]
    )
    
}
const handleOnSubMit=(e)=>{
    e.preventDefault()
    const formData=new FormData()
    formData.append('hinhAnh',file)
    formData.set('ten',form.ten)
    formData.set('email',form.email)
    formData.set('matKhau',form.matKhau)
    formData.set('dienThoai',form.dienThoai)
    callAPIWithFileData('POST',POST_DangKy,formData).then(
        res=>{
            setSnack(prev=>({
                ...prev,
                open:true,
                message:'Đăng ký tài khoản thành công!',
        severity: 'success'

            }))
           setTimeout(() => {
            props.history.push('/auth/login')
           }, 1000);
        }
    ).catch(err=>{
        setSnack(prev=>({
            ...prev,
            open:true,
            message:'Email đã tồn tại',
    severity: 'error'

        }))

    })
}
const handleClose=()=>{
    setSnack(prev=>({
        ...prev,open:false
    }))
}

  return (
    <Container component="main" maxWidth="xs"  className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleOnSubMit}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="name"
                name="ten"
                variant="outlined"
                required
                fullWidth
                id="ten"
                label="Name"
                autoFocus
                value={form.ten}
                onChange={handleOnchange}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="dienThoai"
                label="Phone"
                name="dienThoai"
                autoComplete="phone"
                value={form.dienThoai}
                onChange={handleOnchange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type='email'
                value={form.email}
                onChange={handleOnchange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="matKhau"
                label="Password"
                type="password"
                id="matKhau"
                autoComplete="current-password"
                value={form.matKhau}
                onChange={handleOnchange}
              />
            </Grid>
         
             <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="hinhAnh "
               
                type="file"
                id="hinhAnh"
              
                onChange={handleFileOnchange}
              />
            </Grid>
         
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/auth/login" >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     <CustomizedSnackbars open={snack.open} handleClose={handleClose}
     message={snack.message} severity={snack.severity}
     
     />
    </Container>
  );
}