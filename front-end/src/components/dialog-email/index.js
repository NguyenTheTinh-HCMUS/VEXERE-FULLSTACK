import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../scss/index.scss'

export default function EmailDialog(props) {
    const [email, setemail] = React.useState(props.email || '')
    React.useEffect(() => {
        setemail(props.email)
    }, [props.email])
 

  return (
    <div>
     
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">VeXeRe</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Bạn thực sự quên mật khẩu và muốn lại lại mật khẩu qua email ?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            name='email'
            value={email}
            onChange={(e)=>setemail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" className='outline'>
            Không
          </Button>
          <Button onClick={()=>props.handleOk(email)} color="primary" className='outline'>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
