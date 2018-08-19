import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Main = (props) => (
  <div>
    <Header />
      {props.children}
    <Footer />
  </div>
)

export default Main