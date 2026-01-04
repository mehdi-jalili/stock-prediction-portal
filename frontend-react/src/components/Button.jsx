import React from 'react'

export default function Button({ text, className }) {
  return (
        <a className={`btn ${className}`} href="">{text}</a>
  )
}
