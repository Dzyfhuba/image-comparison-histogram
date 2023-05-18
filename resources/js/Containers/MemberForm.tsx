import React from 'react'
import { useStoreState } from '../Redux/hook'

// type Props = {}

const MemberForm = () => {
  const { members } = useStoreState(state => state)

  return (
    <form className='shadow border p-3 rounded'>
      <label htmlFor="member">Pilih Member</label>
      <select name="member">
        <option hidden>Select Members</option>
        {
          members.map(member => (
            <option value={member.id} key={member.id}>
              {member.username}
            </option>
          ))
        }
      </select>
    </form>
  )
}

export default MemberForm
