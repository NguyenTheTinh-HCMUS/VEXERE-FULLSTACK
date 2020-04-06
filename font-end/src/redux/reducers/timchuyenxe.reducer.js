import  * as TYPES from '../types/index'
const initialState = {
    thongTinChuyenXe: {},
    loaded: false,
    ds_hienThi: []
}
 const timChuyenXe =(state = initialState, action) => {
    switch (action.type) {
        case TYPES.TIM_CHUYENXE :{
            state.thongTinChuyenXe=action.thongTinChuyenXe
            
            if(state.thongTinChuyenXe.ds_chuyenXe){
                state.ds_hienThi=state.thongTinChuyenXe.ds_chuyenXe
            }
            state.loaded=true
            return {...state}
        }

  
    default:
        return state
    }
}
export default timChuyenXe
