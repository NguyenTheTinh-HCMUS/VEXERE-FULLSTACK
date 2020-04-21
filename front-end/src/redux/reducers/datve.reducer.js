import * as TYPES from '../types/index'
import {trangThaiGhe} from '../../constants/index'
const initialState = {
    thongTinChuyenXe: {},
    danhSachGhe: [],
    loaded: false,
    tram: null,
    gheChon:null,
    gheBo: null,
    socket:null
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
            state.gheChon={
                _id:action.thongTinGhe._id,
                date: (new Date()).toISOString()
            }
            action.thongTinGhe.status=trangThaiGhe[3]
        }
        else{
            state.gheBo={_id:action.thongTinGhe._id,
                date: (new Date()).toISOString()}
            action.thongTinGhe.status=trangThaiGhe[0]
        }
        state.danhSachGhe=[...state.danhSachGhe.slice(0,pos),{...action.thongTinGhe},...state.danhSachGhe.slice(pos+1)]
        return {...state}
    }
    case TYPES.HANDLE_CHONGHE:{
        
        const pos=state.danhSachGhe.findIndex(item=>item._id===action._id)
       
        let temp={...state.danhSachGhe[pos]}
        temp.status=trangThaiGhe[2]
       
        
        state.danhSachGhe=[...state.danhSachGhe.slice(0,pos),{...temp},...state.danhSachGhe.slice(pos+1)]
        
        return {...state}
    }
    case TYPES.HANDLE_BOGHE:{
        const pos=state.danhSachGhe.findIndex(item=>item._id===action._id)
        let temp={...state.danhSachGhe[pos]}
        temp.status=trangThaiGhe[0]
       
        
        state.danhSachGhe=[...state.danhSachGhe.slice(0,pos),{...temp},...state.danhSachGhe.slice(pos+1)]
        return {...state}
    }
    case TYPES.CREATE_SOCKET:{
        state.socket=action.socket
        return {...state}
    }
    case TYPES.HUY_TAT_GHE:{
        let ds=[]
        for (const item of state.danhSachGhe) {
            const temp={...item}
            if(action.data.includes(item._id)){
                temp.status=trangThaiGhe[0]
            }
            ds.push(temp)
        }
        state.danhSachGhe=ds
        return {...state}
    }
    default:
        return state
    }
}
export default datVeReducer
