import Button from '@/Components/Button'
import React from 'react'
import { GoPlus } from 'react-icons/go'

const CreateButton = () => {
  return (
    <Button className={`bg-primary rounded-full p-3 border border-primary
      fixed bottom-16 right-2 hover:bg-white-1 hover:text-primary
        transition-colors duration-300 text-white`}>
      <GoPlus size={20} />
    </Button>
  )
}

export default CreateButton
