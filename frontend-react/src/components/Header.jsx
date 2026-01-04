import React from 'react'
import Button from './Button'

export default function Header() {
  return (
    <>
      <nav className="navbar container pt-3 pb-3 align-items-start">
        <a className='navbar-brand text-light' href="">Stock Prediction Portal</a>

        <div>
          <Button text="Login" className="btn-outline-info" />
          &nbsp;
          <Button text="Register" className="btn-info" />
        </div>
      
      </nav>
    </>
  )
}
