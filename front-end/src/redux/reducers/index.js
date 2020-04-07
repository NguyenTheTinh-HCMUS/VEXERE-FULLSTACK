import {combineReducers} from 'redux'

import trangChuReducer from './trangchu.reduce'
import timChuyenXe from './timchuyenxe.reducer'
export default combineReducers({
    trangChuReducer,
    timChuyenXe
    
})