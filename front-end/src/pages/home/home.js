import React, { Component, Fragment } from 'react'
import DatVe from '../../components/DatVe'
import UuDai from '../../components/UuDai'

import Footer from '../../components/footer'
import Header from '../../components/header'
class Home extends Component {
    handleTimChuyenXe=(tuyenDuong,ngayDi)=>{
        this.props.history.push(`/TimChuyenXe/${tuyenDuong}/${ngayDi}`)
    }
    render() {
        return (
           <Fragment>
               <Header />
               <DatVe timChuyenXe={this.handleTimChuyenXe} />
               <UuDai  />
              
               
               <Footer />
               
           </Fragment>
        )
    }
}


export default  Home
