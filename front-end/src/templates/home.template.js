import React, { Component, Fragment } from 'react'

import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {trangThaiGhe} from '../constants/index'

const mapStateToProps=state=>({
  socket: state.datVeReducer.socket,
  danhSachGheChon: state.datVeReducer.danhSachGhe.filter(item=>item.status===trangThaiGhe[3]),
  socketTimChuyenXe: state.timChuyenXe.socket
})


const HomeLayout=connect(mapStateToProps,null) (class  extends Component {
   componentDidMount(){
     document.body.scrollTop=0
     document.documentElement.scrollTop = 0;
   }
   componentWillUnmount(){
    if(this.props.children.props.match.path==='/DatVe/:id'){
      if(this.props.danhSachGheChon.length>0){
        this.props.socket.emit('huy-tat-ghe-client',{
          chuyenXe: this.props.children.props.match.params.id,
          dsGhe:this.props.danhSachGheChon.map(item=>item._id)
        })
      }

     
      this.props.socket.disconnect()
    }
    if(this.props.children.props.match.path==='/TimChuyenXe/:tuyenDuong/:ngayDi'){
      this.props.socketTimChuyenXe.disconnect()
    }
   }
    render() {
        return (
           <Fragment >
            
               {this.props.children}
            
           </Fragment>
        )
    }
})

export default function HomeTemplate({ Component, ...props }) {
    return (
      <Route
        {...props}
        render={propsRoute => (
          <HomeLayout>
            <Component {...propsRoute} />
          </HomeLayout>
        )}
      />
    );
  }


