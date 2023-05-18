import Label from '@/Components/Label'
import Modal from '@/Components/Modal'
import Select from '@/Components/Select';
import { useStoreState } from '@/Redux/hook'
import React, { useState } from 'react'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const Form = () => {
  const { members } = useStoreState(state => state)

  const [selectedMember, setSelectedMember] = useState(null)

  return (
    <Modal header={'Tambah Member Baru'}>
      <form>
        <Label htmlFor='member'>Member</Label>
        <Select
          defaultValue={selectedMember}
          onChange={setSelectedMember as never}
          options={
            members.map(member => {
              return {
                label: member.username,
                value: member.id
              }
            })
          }
        />
      </form>
    </Modal>
  )
}

export default Form
