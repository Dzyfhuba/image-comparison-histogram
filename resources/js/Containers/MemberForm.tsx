import React, { useState } from 'react'
import { useStoreState } from '../Redux/hook'
import Select, { ActionMeta } from 'react-select'
// import Select from '@/Components/Select'

type Props = {
  setSelectedMember: React.Dispatch<React.SetStateAction<null>>
  // selectedMember: null
}

const MemberForm = (props: Props) => {
  const { members } = useStoreState(state => state)

  return (
    <form className='shadow border p-3 rounded'>
      <label htmlFor="member">Pilih Member</label>
      <Select
        name='member'
        onChange={props.setSelectedMember}
        options={
          members.map(member => {
            return {
              value: member.id,
              label: member.username
            }
          }) as never
        }
        isClearable
      />
    </form>
  )
}

export default MemberForm
