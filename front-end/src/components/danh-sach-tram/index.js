/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {connect} from 'react-redux'
import {ChangeTram_Action} from '../../redux/actions/datve.action'
 function ComboBox_DanhSachTram(props) {
     const handleOnChange=(e,value)=>{
         props.changeTram(value)
     }
  return (
    <div style={{ width: 300,margin: 'auto' }}>
    <Autocomplete
       options={props.ds_tram}
       getOptionLabel={(option) => option.diaChi}
       onChange={handleOnChange}
     
      id="debug"
      debug
      renderInput={(params) => <TextField {...params} label="Chọn điểm lên xe" margin="normal" />}
    />
    </div>

  );
}
const mapStatesToProps=state=>({
    ds_tram: state.datVeReducer.thongTinChuyenXe.tram || []
})
const mapDispatchToProps=dispatch=>({
    changeTram: tram=>dispatch(ChangeTram_Action(tram))
})
export default  connect(mapStatesToProps,mapDispatchToProps) (ComboBox_DanhSachTram)

