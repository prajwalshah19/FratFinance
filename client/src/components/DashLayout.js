import { Outlet } from "react-router-dom";
import Nav from './Nav'
import React from 'react'
import Dash from './Dash'

function DashLayout(props) {
  return (
      <>
        <Nav primary = {props.primary} secondary = {props.secondary} />
        <Dash primary = {props.primary} secondary = {props.secondary}/>
      </>
    
  )
}

export default DashLayout
