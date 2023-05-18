import Button from '@/Components/Button'
import CreateButton from '@/Containers/Members/CreateButton'
import MemberInterface from '@/Interfaces/MemberInterface'
import Guest from '@/Layouts/Guest'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const Members = () => {
  const [members, setMembers] = useState<MemberInterface[]>([])

  const fetchData = async () => {
    const members = await axios.get('/api/members')
      .then(res => {
        return res.data
      })
      .catch(error => {
        console.error(error)
        return []
      })
    setMembers(members)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Guest className='min-h-screen px-3'>
      <h1 className='text-2xl font-black underline'>Kelola Members</h1>
      <ul className='flex flex-col gap-3'>
        {
          members.map(member => (
            <li
              key={member.id}
              className='shadow-md border border-primary rounded-2xl p-3 flex flex-col flex-wrap h-32 gap-1'>
              <span>{`Member ID: ${member.id}`}</span>
              <span>{`Username: ${member.username}`}</span>
              <span>{new Date(member.updated_at).toLocaleString('id')}</span>
              <span>
                <Zoom>
                  <img
                    src={`/api/members/${member.id}/kyc_image`}
                    alt={member.username}
                    className='w-16 h-16 object-contain mx-auto'
                  />
                </Zoom>
              </span>
              <span className='flex-grow flex items-end justify-end'>
                <Button level='primary'>Edit</Button>
              </span>
            </li>
          ))
        }
      </ul>
      <CreateButton />
    </Guest>
  )
}

export default Members
