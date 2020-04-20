import React, { Component, Fragment } from 'react'


import {Route} from 'react-router-dom'

 class HomeLayout extends Component {
   componentDidMount(){
    
     document.body.scrollTop=0
     document.documentElement.scrollTop = 0;
   }
    render() {
        return (
           <Fragment >
            
               {this.props.children}
            
           </Fragment>
        )
    }
}
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


