import React, { useState } from 'react'
import MemberForm from '@/Containers/MemberForm'
import Guest from '@/Layouts/Guest'

const Dashboard = () => {
  const [selectedMember, setSelectedMember] = useState(null)

  return (
    <Guest className='min-h-screen px-3'>
      <h1>Image Comparison</h1>
      <MemberForm setSelectedMember={setSelectedMember} />
    </Guest>
  )
}

export default Dashboard
