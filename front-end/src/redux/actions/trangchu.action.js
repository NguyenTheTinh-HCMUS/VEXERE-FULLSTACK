import * as Types from "../types/index";
import callAPI from "../../utils/callApi";
import * as URL from "../../constants/config.api";
const get_ds_diaDiem = ds_diaDiem => ({
  type: Types.GET_DS_DIADIEM,
  ds_diaDiem
});

export const get_ds_diaDiem_request = () => {
  return dispatch => {
    return callAPI("get", URL.GET_DIADIEM)
      .then(res => {
        dispatch(get_ds_diaDiem(res.data));
      })
      .catch(err => console.log(err));
  };
};
const get_ds_DiaDiemDen=(ds_diaDiemDen)=>({
    type: Types.GET_DANHSACHDIADIEMDEN,
    ds_diaDiemDen
})
export const get_ds_DiaDiemDen_request=(diemDiId)=>{
    return dispatch=>{
        return callAPI('post',URL.POST_DANHSACHDIADIEMDEN,{
            diemBatDauId: diemDiId
        }).then(res=>{
            dispatch(get_ds_DiaDiemDen(res.data))
        }).catch(err => console.log(err));
    }
}
export const reset_diaDiem=(pos)=>({
    type: Types.RESET_DIADIEM,
    pos
})
export const  dispatch_ngayDi=(_id)=>{
 
  return ({
    type: Types.DISPATCH_NGAYDI,
    _id
  })
}
export const choose_ngayDi=(ngay)=>({
  type: Types.CHOOSE_NGAYDI,
  ngay
})
