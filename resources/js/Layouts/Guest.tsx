import React, { useEffect } from 'react'
import Navbar from '@/Containers/Navbar'
import { useStoreActions } from '@/Redux/hook'

type Props = React.HTMLAttributes<HTMLDivElement>

const Guest = (props: Props) => {
  const { fetchMembers } = useStoreActions(actions => actions)
  useEffect(() => {
    fetchMembers()
  }, [])

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
