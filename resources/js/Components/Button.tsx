import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  level?: 'primary' | 'secondary'
}

const Button = (props: Props) => {
  if (props.level) {
    return (
      <button
        {...props}
        className={`bg-primary px-5 border border-primary hover:bg-white-1 hover:text-primary
        transition-colors duration-300 rounded-md text-white`}>
        {props.children}
      </button>
    )
  }

  return (
    <button {...props}>
      {props.children}
    </button>
  )
}

export default Button
