import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  level?: 'primary' | 'secondary' | 'danger' | 'success'
}

const Button = (props: Props) => {
  if (props.level === 'primary') {
    return (
      <button
        {...props}
        className={`bg-primary px-5 rounded-md border border-primary hover:bg-white-1 hover:text-primary
        transition-colors duration-300 text-white${props.className ? ' ' + props.className : ''}`}>
        {props.children}
      </button>
    )
  }

  if (props.level === 'danger') {
    return (
      <button
        {...props}
        className={`bg-red-500 px-5 rounded-md border border-red-500 hover:bg-white-1 hover:text-red-500
        transition-colors duration-300 text-white${props.className ? ' ' + props.className : ''}`}>
        {props.children}
      </button>
    )
  }

  if (props.level === 'success') {
    return (
      <button
        {...props}
        className={`bg-green-500 px-5 rounded-md border border-green-500 hover:bg-white-1 hover:text-green-500
        transition-colors duration-300 text-white${props.className ? ' ' + props.className : ''}`}>
        {props.children}
      </button>
    )
  }

  return (
    <button
      {...props}
      className={`${props.className}`}
    >
      {props.children}
    </button>
  )
}

export default Button
