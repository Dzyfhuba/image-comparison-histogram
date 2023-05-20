import Button from '@/Components/Button'
import CreateButton from '@/Containers/Members/CreateButton'
import Form from '@/Containers/Members/Form'
import MemberInterface from '@/Interfaces/MemberInterface'
import Guest from '@/Layouts/Guest'
import { useStoreActions, useStoreState } from '@/Redux/hook'
import store from '@/Redux/store'
import axios from 'axios'
import { StoreProvider } from 'easy-peasy'
import React, { useEffect, useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { nanoid } from 'nanoid'

const Members = () => {
  const { members } = useStoreState(state => state)
  const { setMembers } = useStoreActions(state => state)

  const ReactSwal = withReactContent(Swal)

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

  const handleEdit = (member:MemberInterface) => {
    ReactSwal.fire({
      title: 'Edit Member',
      showConfirmButton: false,
      html: (
        <StoreProvider store={store}>
          <Form mode='edit' member={member} />
        </StoreProvider>
      )
    })
  }

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
                    src={`/api/members/image/${member.kyc_image}`}
                    alt={member.username}
                    className='w-16 h-16 object-contain mx-auto'
                    key={nanoid()}
                  />
                </Zoom>
              </span>
              <span className='flex-grow flex items-end justify-end'>
                <Button level='primary' onClick={() => handleEdit(member)}>Edit</Button>
              </span>
            </li>
          ))
        }
      </ul>
      <CreateButton />
      {/* <Form mode='create' /> */}
    </Guest>
  )
}

export default Members
