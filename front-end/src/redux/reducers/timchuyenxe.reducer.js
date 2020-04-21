import * as TYPES from "../types/index";
import moment from 'moment'
const initialState = {
  thongTinChuyenXe: {},
  loaded: false,
  ds_hienThi: [],
  soketLike: null,
  socketDanhGia: null,
  socket: null,
  boLoc: null
};

const timChuyenXe = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.TIM_CHUYENXE: {
      state.thongTinChuyenXe = action.thongTinChuyenXe;

      if (state.thongTinChuyenXe.ds_chuyenXe) {
        state.ds_hienThi = state.thongTinChuyenXe.ds_chuyenXe;
      }
      state.loaded = true;
      return { ...state };
    }
    case TYPES.THEM_DANHGIA: {
      state.socketDanhGia = action.danhGia;

      const pos = state.ds_hienThi.findIndex(
        (item) => item.thongTinXe._id === action.danhGia.xe
      );
      if (pos > -1) {
        const temp = JSON.parse(JSON.stringify(state.ds_hienThi[pos]));
        temp.thongTinXe.danhSachDanhGia = [
          ...temp.thongTinXe.danhSachDanhGia,
          action.danhGia,
        ];
        state.ds_hienThi = [
          ...state.ds_hienThi.slice(0, pos),
          {...temp},
          ...state.ds_hienThi.slice(pos + 1),
        ];
      }

      return { ...state };
    }
   
    case TYPES.DISPATCH_LIKE: {
      // console.log(action.thongTinDanhGia.xe)
      state.soketLike = action.thongTinDanhGia;
      const pos = state.ds_hienThi.findIndex(
        (item) => item.thongTinXe._id === action.thongTinDanhGia.xe
      );

      if (pos > -1) {
        const pos1 = state.ds_hienThi[pos].thongTinXe.danhSachDanhGia.findIndex(
          (item) => item._id === action.thongTinDanhGia.danhGia._id
        );
        const temp = JSON.parse(JSON.stringify(state.ds_hienThi[pos]));
        temp.thongTinXe.danhSachDanhGia[pos1] = action.thongTinDanhGia.danhGia;

        state.ds_hienThi = [
          ...state.ds_hienThi.slice(0, pos),
          temp,
          ...state.ds_hienThi.slice(pos + 1),
        ];
      }

      return { ...state };
    }
    case TYPES.SOCKET_LIKE: {
      // console.log(action.thongTinDanhGia.xe)
      // state.soketLike=action.thongTinDanhGia
      const pos = state.ds_hienThi.findIndex(
        (item) => item.thongTinXe._id === action.thongTinDanhGia.xe
      );

      if (pos > -1) {
        const pos1 = state.ds_hienThi[pos].thongTinXe.danhSachDanhGia.findIndex(
          (item) => item._id === action.thongTinDanhGia.danhGia._id
        );
        const temp = JSON.parse(JSON.stringify(state.ds_hienThi[pos]));
        temp.thongTinXe.danhSachDanhGia[pos1] = action.thongTinDanhGia.danhGia;

        state.ds_hienThi = [
          ...state.ds_hienThi.slice(0, pos),
          temp,
          ...state.ds_hienThi.slice(pos + 1),
        ];
      }

      return { ...state };
    }

    case TYPES.SOCKET_DANHGIA: {
  
        const pos = state.ds_hienThi.findIndex(
          (item) => item.thongTinXe._id === action.danhGia.xe
        );
        if (pos > -1) {
          const temp = JSON.parse(JSON.stringify(state.ds_hienThi[pos]));
          temp.thongTinXe.danhSachDanhGia = [
            ...temp.thongTinXe.danhSachDanhGia,
            action.danhGia,
          ];
          state.ds_hienThi = [
            ...state.ds_hienThi.slice(0, pos),
            temp,
            ...state.ds_hienThi.slice(pos + 1),
          ];
        }
  
        return { ...state };
      }
      case TYPES.CREATE_SOCKET:{
        state.socket=action.socket
        return {...state}
      }
case TYPES.LOC_GIO:{
 
  if(state.thongTinChuyenXe.ds_chuyenXe){
    state.ds_hienThi= locGio(state.thongTinChuyenXe.ds_chuyenXe,action.values)
  }

  
  return {...state}
}
case TYPES.LOC_GIA:{
  if(state.thongTinChuyenXe.ds_chuyenXe){
    state.ds_hienThi= locGia(state.thongTinChuyenXe.ds_chuyenXe,action.values)
  }
  return {...state}
}
case TYPES.LOC_CHO:{
 
  if(state.thongTinChuyenXe.ds_chuyenXe){
    state.ds_hienThi= locCho(state.thongTinChuyenXe.ds_chuyenXe,action.values)
  }

  return {...state}
}
case TYPES.BO_LOC:{
  
  state.boLoc=(new Date()).toISOString()
  state.ds_hienThi = state.thongTinChuyenXe.ds_chuyenXe;
 
  return {...state}
}
case TYPES.SORT_GIA:{
  state.ds_hienThi=JSON.parse(JSON.stringify(sortGia(state.ds_hienThi,action.check)))
  return {...state}
}
case TYPES.SORT_GIO:{
  console.log(sortGio(state.ds_hienThi,action.check))
  state.ds_hienThi=JSON.parse(JSON.stringify(sortGio(state.ds_hienThi,action.check)))
  return {...state}
}

    default:
      return state;
  }
};

const locGio=(ds_chuyen,range)=>{
  
  
  return ds_chuyen.filter(item=> moment(item.ngayDi).hour()>=range[0] && moment(item.ngayDi).hour()<=range[1] )
}
const locGia=(ds_chuyen,range)=>{
  
  
  return ds_chuyen.filter(item=> item.giaVe>=range[0] && item.giaVe<=range[1] )
}
const locCho=(ds_chuyen,range)=>{
  
  
  return ds_chuyen.filter(item=> item.thongTinXe.loaiXe.sucChua>=range[0] &&  item.thongTinXe.loaiXe.sucChua<=range[1] )
}

const sortGia=(ds_chuyen,check)=>{
  if(check>0){
    return ds_chuyen.sort((a,b)=>a.giaVe-b.giaVe)

  }
  else{
    return ds_chuyen.sort((a,b)=>b.giaVe-a.giaVe)
  }
}
const sortGio=(ds_chuyen,check)=>{
  if(check>0){
    return ds_chuyen.sort((a,b)=>moment(a.ngayDi).hour()>moment(b.ngayDi).hour())

  }
  else{
    return ds_chuyen.sort((a,b)=>moment(a.ngayDi).hour()<moment(b.ngayDi).hour())
  }
}


export default timChuyenXe;
