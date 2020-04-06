import * as TYPES from '../types/index'
import loc from '../../utils/locNgay'
const initialState = {
    diaDiem: [],
    ds_diaDiemDen: [],
    tuyen: null    ,
    ds_Ngay: [],
    ngayDi: null
}

const trangChuReducer= (state = initialState, action) => {
    switch (action.type) {
        case TYPES.GET_DS_DIADIEM :{
            state.diaDiem=action.ds_diaDiem
            return {...state}

        }
        case TYPES.GET_DANHSACHDIADIEMDEN :{
            state.ds_diaDiemDen=action.ds_diaDiemDen
            state.ds_Ngay=[]
            state.ngayDi=null
            return {...state}

        }
        case TYPES.RESET_DIADIEM :{
            if(action.pos===1){
                state.ds_diaDiemDen=[]

            }
            return {...state}

        }
        case TYPES.DISPATCH_NGAYDI :{
            const pos=state.ds_diaDiemDen.ds_diemDen.findIndex(item=>item._id===action._id)
            if(pos>=0){
               
                 state.tuyen=state.ds_diaDiemDen.ds_diemDen[pos].ds_chuyenXe[0].tuyen
                const ds_chuyenXe= state.ds_diaDiemDen.ds_diemDen[pos].ds_chuyenXe
                state.ngayDi=null
               state.ds_Ngay=loc(ds_chuyenXe)
            }
           
            return {...state}

        }
        case TYPES.CHOOSE_NGAYDI :{
            state.ngayDi=action.ngay
         
            return {...state}

        }


    default:
        return state
    }
}
export default trangChuReducer
