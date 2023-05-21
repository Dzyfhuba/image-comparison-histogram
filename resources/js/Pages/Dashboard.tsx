import React, { useEffect, useState } from 'react'
import MemberForm from '@/Containers/MemberForm'
import Guest from '@/Layouts/Guest'
import { SingleValue } from 'react-select'
import MemberInterface from '@/Interfaces/MemberInterface'
import axios from 'axios'
import Swal from 'sweetalert2'

type Option = {
  label: string
  value: number
}

const Dashboard = () => {
  const [selectedMember, setSelectedMember] = useState<SingleValue<Option>>(null)
  const [member, setMember] = useState<MemberInterface>()

  const fetchData = async (memberId: number) => {
    if (!memberId) return

    const member = await axios.get(`/api/members/${memberId}`)
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.error(err)
        Swal.fire({
          title: 'Error 500',
          icon: 'error'
        })
        return []
      })
    setMember(member)
  }
  
  useEffect(() => {
    fetchData(selectedMember?.value || 0)
  }, [selectedMember])

  return (
    <Guest className='min-h-screen px-3'>
      <h1>Image Comparison</h1>
      <MemberForm setSelectedMember={setSelectedMember} />
      <div id='comparison'>
        <div id="image-a">
          <img
            src={`/api/members/image/${member?.kyc_image}`}
            alt={member?.username} 
          />
        </div>
      </div>
    </Guest>
  )
}

export default Dashboard
