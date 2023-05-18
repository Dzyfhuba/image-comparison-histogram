import React from 'react'
import Navbar from '@/Containers/Navbar'

type Props = React.HTMLAttributes<HTMLDivElement>

const Guest = (props: Props) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className='px-3'>
        {props.children}
      </main>
    </div>
  )
}

export default Guest
