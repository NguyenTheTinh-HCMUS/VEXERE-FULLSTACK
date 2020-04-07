import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import '../scss/index.scss'

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function Dialogg(props) {


  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
     
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
         VeXeRe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              {props.thongBao}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose} color="primary" className='outline'>
            Không
          </Button>
          <Button onClick={props.handleOk} color="primary" className='outline'>
            Đồng Ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
