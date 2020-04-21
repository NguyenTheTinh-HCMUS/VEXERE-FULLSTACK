import React from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import '../scss/index.scss'
import {connect} from 'react-redux'
import {themDanhGia_request} from '../../redux/actions/timchuyenxe.action'
import shorid from 'shortid'
const useStyle=makeStyles(them=>({
    textArea:{
        width: '100%'
        
    }
}))

 function FormDanhGia(props) {
    const classes=useStyle()
    const [value, setValue] = React.useState(1);
    const handleOnSubmit=(e)=>{
        e.preventDefault()
        
        if(localStorage.getItem('TAIKHOAN')){
          if(typeof(value)==='number' && text!=='' ){
            const data={
              sao: value,
              noiDung:text,
              xe:props.thongTin.thongTinXe._id,
              taiKhoan:JSON.parse(localStorage.getItem('TAIKHOAN'))._id ,
            }
          
            props.themDanhGia_request(data)
           
          
            setText('')
            setValue(1)
  
          }

        }
      
    }
    const [text, setText] = React.useState('')

  const handleOnchangeText=(e)=>{
    setText(e.target.value)
  
  }
  return (
    <div className="form-danh-gia">
     <form onSubmit={handleOnSubmit}>

     <Rating
          name={`simple${shorid.generate()}`}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      <Grid item >
        <TextareaAutosize required className={classes.textArea}  rowsMin={2} 
        placeholder="Nhập bình luận"
        onChange={handleOnchangeText}
        value={text}
        />
      </Grid>
      <Button variant="contained" color="primary" className='outline' type='submit'>
        Gửi
      </Button>
     </form>
    </div>
  );
}
const mapDispatchToProps=dispatch=>({
  themDanhGia_request: data=>dispatch(themDanhGia_request(data))
})

export default connect(null,mapDispatchToProps) (FormDanhGia)


