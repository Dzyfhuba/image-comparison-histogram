import React from 'react'
import MemberForm from '@/Containers/MemberForm'
import Guest from '@/Layouts/Guest'

const Dashboard = () => {
  return (
    <Guest className='min-h-screen px-3'>
      <h1>Image Comparison</h1>
      <MemberForm />
    </Guest>
  )
}

export default Dashboard
