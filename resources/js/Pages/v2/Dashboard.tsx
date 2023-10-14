import Guest from '@/Layouts/v2/Guest'
import { Fab } from 'konsta/react'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

const Dashboard = () => {
  return (
    <Guest>
      Dashboard
      <Fab icon={<BsThreeDotsVertical />} className='fixed bottom-10-safe right-10-safe rounded-full' />
    </Guest>
  )
}

export default Dashboard