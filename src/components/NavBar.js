import React from 'react'
import '../App.css'
import { NavLink } from 'react-router-dom'

export const NavBar = ({ cartAmount }) => {
  return (
    <nav className="navBar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/cart">
        Cart<div>{`(${cartAmount})`}</div>
      </NavLink>
    </nav>
  )
}
