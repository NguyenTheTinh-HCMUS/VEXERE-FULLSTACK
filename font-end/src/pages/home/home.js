import React, { Component, Fragment } from 'react'
import DatVe from '../../components/DatVe'
import UuDai from '../../components/UuDai'

import Footer from '../../components/footer'
import Header from '../../components/header'


 
export class Home extends Component {
    render() {
        return (
           <Fragment>
               <Header />
               <DatVe />
               <UuDai />
              
               
               <Footer />
               
           </Fragment>
        )
    }
}

export default Home
