import * as TYPES from "../types/index";
const initialState = {
  thongTinChuyenXe: {},
  loaded: false,
  ds_hienThi: [],
  soketLike: null,
  socketDanhGia: null,
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
          temp,
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

    default:
      return state;
  }
};
export default timChuyenXe;
