import * as TYPES from '../types/index'
import {trangThaiGhe} from '../../constants/index'
const initialState = {
    thongTinChuyenXe: {},
    danhSachGhe: [],
    loaded: false,
    tram: null
}

const datVeReducer= (state = initialState,action) => {
    switch (action.type) {
    case TYPES.GET_THONGTINCHUYENXE:{
        state.thongTinChuyenXe=action.thongTinChuyenXe
        for (const iterator of action.thongTinChuyenXe.ds_gheGheChuyenXe) {
            if(iterator.gheTrong){
                iterator.status=trangThaiGhe[0]
            }
            else{
                iterator.status=trangThaiGhe[1]
            }
        }
        state.danhSachGhe=action.thongTinChuyenXe.ds_gheGheChuyenXe
        state.loaded=true
        return {...state}
    }
    case TYPES.CHANGE_TRAM:{
        state.tram=action.tram
        return {...state}
    }
    case TYPES.HANDLE_GHE:{
        const pos=state.danhSachGhe.findIndex(item=>item._id===action.thongTinGhe._id)
        if(state.danhSachGhe[pos].status===trangThaiGhe[0]){
            action.thongTinGhe.status=trangThaiGhe[3]
        }
        else{
            action.thongTinGhe.status=trangThaiGhe[0]
        }
        state.danhSachGhe=[...state.danhSachGhe.slice(0,pos),{...action.thongTinGhe},...state.danhSachGhe.slice(pos+1)]
        return {...state}
    }
    default:
        return state
    }
}
export default datVeReducer
