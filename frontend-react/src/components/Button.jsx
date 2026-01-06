import React from 'react'
import { Link } from 'react-router-dom'


export default function Button({ text, className, url }) {
  return (
    <Link className={`btn ${className}`} to={url}>{text}</Link>
  )
}
