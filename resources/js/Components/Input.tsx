import React, { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement>

const Input = (props: Props) => {
  return (
    <input
      {...props}
      className={`p-2.5 rounded-md outline outline-1 outline-neutral-1 disabled:bg-neutral-200 disabled:text-neutral-500`} 
    />
  )
}

export default Input