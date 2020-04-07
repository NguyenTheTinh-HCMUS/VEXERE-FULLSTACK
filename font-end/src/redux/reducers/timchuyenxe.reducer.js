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
        case TYPES.THEM_DANHGIA:{
        
            const pos=state.ds_hienThi.findIndex(item=>item.thongTinXe._id===action.danhGia.xe)
            const temp=JSON.parse(JSON.stringify(state.ds_hienThi[pos]))
            temp.thongTinXe.danhSachDanhGia=[...temp.thongTinXe.danhSachDanhGia,action.danhGia]
            state.ds_hienThi=[...state.ds_hienThi.slice(0,pos),temp,...state.ds_hienThi.slice()]
    
            return {...state}
        }

  
    default:
        return state
    }
}
export default timChuyenXe
