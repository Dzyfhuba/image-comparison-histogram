import Button from '@/Components/Button'
import React, { SyntheticEvent } from 'react'
import { GoPlus } from 'react-icons/go'
import Form from './Form'
import { useStoreActions } from '@/Redux/hook'


const CreateButton = () => {
  const { setModalVisibility } = useStoreActions(actions => actions)

  const handleClick = (e: SyntheticEvent) => {
    console.log(e.target);

    setModalVisibility(true)
  }

  return (
    <Button
      className={`bg-primary rounded-full p-3 outline outline-primary
      fixed bottom-16 right-2 hover:bg-white-1 hover:text-primary
        transition-colors duration-300 text-white`}
      onClick={handleClick}
    >
      <GoPlus size={20} />
    </Button>
  )
}

export default CreateButton
