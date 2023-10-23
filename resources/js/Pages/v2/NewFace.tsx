import React, { ChangeEvent, FormEvent, useState } from 'react'
import Guest from "@/Layouts/v2/Guest"
import { Camera, CameraResultType, Photo } from '@capacitor/camera'
import { Button, Card, Icon, List, ListInput, ListItem, Toggle } from 'konsta/react'
import { useStoreState } from '@/Redux/hook'
import { MdCancel, MdClose } from 'react-icons/md'
import NoImage from '@/Images/No-Image-Found.png'
import { router } from '@inertiajs/react'

type FormData = {
  username?: string
  replace?: boolean
  image?: Photo
}

const NewFace = () => {
  const { image } = useStoreState(state => state)
  const [formData, setFormData] = useState<FormData>({})

  return (
    <Guest>
      <div className='h-screen flex flex-col p-3'>
        <img src={image?.webPath || NoImage} alt="captured image" className='h-full object-cover' />
        <List>
          <ListInput
            floatingLabel
            label='Username'
            type='text'
            required
          />
          <ListItem
            title='Update'
            after={
              <Toggle
                checked={formData?.replace || false}
                onChange={() => setFormData({
                  ...formData,
                  replace: !formData.replace
                })}
              />
            }
          />
        </List>
        <div className='flex gap-1'>
          <Button clear className='w-min k-color-red' tabIndex={1} onClick={() => {setFormData({});router.visit('/')}}>
            <Icon material={<MdClose size={44} />} className='aspect-square' />
          </Button>
          <Button
            className='k-color-green'
          >
            Save
          </Button>
        </div>
      </div>
    </Guest>
  )
}

export default NewFace