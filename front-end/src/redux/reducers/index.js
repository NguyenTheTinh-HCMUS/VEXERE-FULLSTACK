import {combineReducers} from 'redux'

import trangChuReducer from './trangchu.reduce'
import timChuyenXe from './timchuyenxe.reducer'
import datVeReducer from './datve.reducer'
export default combineReducers({
    trangChuReducer,
    timChuyenXe,
    datVeReducer
    
})