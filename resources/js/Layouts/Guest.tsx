import React from 'react'
import Navbar from '@/Containers/Navbar'

type Props = React.HTMLAttributes<HTMLDivElement>

const Guest = (props: Props) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      {props.children}
    </div>
  )
}

export default Guest
