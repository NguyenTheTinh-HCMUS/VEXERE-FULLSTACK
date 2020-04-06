import React from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {makeStyles} from '@material-ui/core/styles'
const useStyle=makeStyles(them=>({
    textArea:{
        width: '100%'
        
    }
}))
export default function FormDanhGia() {
    const classes=useStyle()
    const [value, setValue] = React.useState(1);
    const handleOnSubmit=(e)=>{
        e.preventDefault()
    }
  return (
    <div className="form-danh-gia">
     <form onSubmit={handleOnSubmit}>

     <Rating
          name="simple"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      <Grid item >
        <TextareaAutosize required className={classes.textArea}  rowsMin={2} placeholder="Nhập bình luận" />
      </Grid>
     </form>
    </div>
  );
}
