import * as Types from "../types/index";
import callAPI from "../../utils/callApi";
import * as URL from "../../constants/config.api";


const thongTinChuyenXe=(thongTinChuyenXe)=>({
    type: Types.TIM_CHUYENXE,
    thongTinChuyenXe
})

export const thongTinChuyenXe_request=(tuyenDuong,ngayDi)=>{
    return dispatch=>{
        return callAPI('POST',URL.POST_TIMCHUYENXE,{
            tuyenDuong,ngayDi
        }).then(res=>{
            dispatch(thongTinChuyenXe(res.data))
          
        }).catch(err=>console.log(err))
    }
}


const themDanhGia=danhGia=>({
    type: Types.THEM_DANHGIA,
    danhGia
})
export const themDanhGia_request=danhGia=>dispatch=>{
   
return callAPI('POST',URL.POST_THEMDANHGIA,danhGia).
then(res=>dispatch(themDanhGia(res.data))).
catch(error=>console.log(error))}

export const Like_Action=thongTinDanhGia=>({
    type: Types.DISPATCH_LIKE,
    thongTinDanhGia
})

export const Like_Socket=thongTinDanhGia=>({
    type: Types.SOCKET_LIKE,
    thongTinDanhGia
})
export const DanhGia_Socket=danhGia=>({
    type: Types.SOCKET_DANHGIA,
    danhGia
})