import * as Types from '../types/index'
import callAPI from '../../utils/callApi'
import * as URL from '../../constants/config.api'
const thongTinChuyenXe_action = (thongTinChuyenXe) => ({
    type: Types.GET_THONGTINCHUYENXE,
    thongTinChuyenXe
})
export const thongTinChuyenXe_request_action=(chuyenXeID)=>dispatch=>{
    return callAPI('GET',URL.POST_CHUYENXE+chuyenXeID).then(
        res=>dispatch(thongTinChuyenXe_action(res.data))
    ).catch(error=>{
        console.log(error)
    })
}

export const ChangeTram_Action=tram=>({
    type: Types.CHANGE_TRAM,
    tram
})
export const HandleGhe_Action=thongTin=>({
    type:Types.HANDLE_GHE,
    thongTinGhe:thongTin
})