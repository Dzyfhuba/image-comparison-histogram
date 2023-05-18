import axios from 'axios'
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from '../Redux/hook'

// type Props = {}

const MemberForm = () => {
  const { members } = useStoreState(state => state)
  const { setMembers } = useStoreActions(actions => actions)

  const fetchData = async () => {
    const data = await axios.get('/api/members')
      .then((res) => {
        return res.data
      })
      .catch(err => {
        console.error(err)
        return []
      })

    setMembers(data)
  }

  useEffect(() => {
    fetchData()
  }, [])
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
