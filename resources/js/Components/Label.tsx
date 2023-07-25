import React, { LabelHTMLAttributes } from 'react'

type Props = LabelHTMLAttributes<HTMLLabelElement>

const Label = (props: Props) => {
  return (
    <label {...props} className={`block ${props.className}`}>
      {props.children}
    </label>
  )
}

export default Label
