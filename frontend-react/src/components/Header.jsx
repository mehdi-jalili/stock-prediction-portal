import React from 'react'

import { Link } from 'react-router-dom' 
import Button from './Button'

export default function Header() {
  return (
    <>
      <nav className="navbar container pt-3 pb-3 align-items-start">
        <Link className='navbar-brand text-light' to="/">Stock Prediction Portal</Link>

        <div>
          <Button text="Login" className="btn-outline-info" url="login" />
          &nbsp;
          <Button text="Register" className="btn-info" url="/register" />
        </div>
      
      </nav>
    </>
  )
}
