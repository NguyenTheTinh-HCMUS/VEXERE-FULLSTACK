import React from "react";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import { withFormik } from "formik";
import * as Yup from 'yup'
import './style.scss'
function FromThongTinKhachHang(props) {

    React.useEffect(() => {
    props.handleErrors( Object.keys(props.errors),props.values)
    }, [props.errors])
    React.useEffect(() => {
      if(Object.keys(props.values).lenght===0){
        props.handleErrors( [1,3],props.values)
      }
     }, [])
  return (
    <div className='thongtinkhachhang'>

      <Grid container justify="center" alignContent="center">

      <Grid  item xs={8}>
      <FormControl fullWidth margin="normal" >
              <InputLabel>Họ Tên</InputLabel>
              <Input
                fullWidth
                name="hoTen"
                type='name'
                value={props.values.hoTen}
                onChange={props.handleChange}
                autoFocus
              />
               <FormHelperText >{props.errors.hoTen}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal" >
              <InputLabel>Email</InputLabel>
              <Input
                fullWidth
                name="email"
                type='email'
                value={props.values.email}
                onChange={props.handleChange}
              />
               <FormHelperText >{props.errors.email}</FormHelperText>
            </FormControl>

            <FormControl fullWidth  margin="normal">
              <InputLabel>Số Điện Thoại</InputLabel>
              <Input
                fullWidth
                name="soDienThoai"
                type='phone'
                value={props.values.soDienThoai}
                onChange={props.handleChange}
              />
               <FormHelperText >{props.errors.soDienThoai}</FormHelperText>
            </FormControl>


      </Grid>
      </Grid>
    
     
    </div>
  );
}
const ThongTinKhachHang = withFormik({
  mapPropsToValues({values}) {
    // Init form field
    return {
      hoTen: "" || values.hoTen,
      email:"" || values.email,
      soDienThoai:"" ||values.soDienThoai
    };
  }
  ,
  validationSchema: Yup.object().shape({ // Validate form field
    hoTen: Yup.string().required('Họ tên không được rỗng.'),
    email:Yup.string().required('Email không được rỗng.').matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,'Email không đúng.'),
    soDienThoai: Yup.string().required('Số điện thoại không được rỗng').matches(/^[0][0-9]+$/,'Số điện thoại không hợp lệ.')

})
})(FromThongTinKhachHang);
export default ThongTinKhachHang;
