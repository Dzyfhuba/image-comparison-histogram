import { AxiosGuest } from '@/Actions/Axios'
import { useCamera } from '@/Actions/Camera'
import NoImage from '@/Images/No-Image-Found.png'
import Guest from "@/Layouts/v2/Guest"
import { useStoreState } from '@/Redux/hook'
import { Photo } from '@capacitor/camera'
import { router } from '@inertiajs/react'
import axios, { AxiosError } from 'axios'
import { Button, Dialog, DialogButton, Icon, List, ListInput, ListItem, Preloader, Toggle } from 'konsta/react'
import React, { ReactNode, useEffect, useState } from 'react'
import { MdClose, MdRefresh } from 'react-icons/md'

type FormData = {
  username?: string
  replace?: boolean
}

const NewFace = () => {
  const { image } = useStoreState(state => state)
  const [username, setUsername] = useState('')
  const [isReplace, setReplace] = useState(false)
  const [confirmOpened, setConfirmOpened] = useState(false);
  const [imageData, setImageData] = useState<Photo | null>(image || null)
  const [isLoading, setLoading] = useState(false)
  const [resMessage, setResMessage] = useState<ReactNode>(null)
  const [resTitle, setResTitle] = useState('')

  const { takePicture } = useCamera()

  const handleSubmit = async () => {
    const body = new FormData()

    body.append('username', username || '')
    body.append('replace', isReplace ? 'true' : 'false')
    if (imageData?.webPath) {
      // fetch blob file with axios
      const res = await axios.get(imageData?.webPath, { responseType: 'blob' })
      console.log(res.data)

      body.append('image', res.data)
      // blob to file image png and append to form data
      const file = new File([res.data], 'image.png', { type: 'image/jpg' })
      body.append('image', file)
      console.log(file)

      console.log(res.data)
    }

    setLoading(true)
    setResTitle('Loading')
    const { data, error } = await AxiosGuest.post('/api/lbph/train', body)
      .then(res => {
        console.log(res.data)

        return {
          data: res.data,
          error: null
        }
      })
      .catch((err) => {
        return {
          error: err.response?.data?.error || { 'message': 'Something went wrong' },
          data: null
        }
      })
    setTimeout(() => {
      setLoading(false)

      // setLoading(false)

      if (error) {
        console.log(error)
        setResTitle('Error')
        setResMessage(Object.values(error).map((err: any, idx) => <p key={idx}>{err}</p>))
        return
      }
    }, 2000)



  }

  return (
    <Guest>
      <div className='h-screen flex flex-col p-3'>
        <img src={imageData?.webPath || NoImage} alt="captured image" className='h-full object-cover' />
        <form onSubmit={(e) => { e.preventDefault(); setConfirmOpened(true); setResTitle('Confirm'); setResMessage(null) }}>
          <List>
            <ListInput
              floatingLabel
              label='Username'
              type='text'
              onChange={(e) => setUsername(e.target.value)}
              required
              tabIndex={0}
              autoFocus
            />
            <ListItem
              title='Update'
              after={
                <Toggle
                  checked={isReplace}
                  onChange={() => setReplace(!isReplace)}
                />
              }
            />
          </List>
        </form>
        <div className='flex gap-1'>
          <Button clear className='w-min k-color-kred' tabIndex={1} onClick={() => router.visit('/')}>
            <Icon material={<MdClose size={44} />} ios={<MdClose size={44} />} className='aspect-square' />
          </Button>
          <Button clear className='w-min k-color-yellow' onClick={async () => {
            const image = await takePicture()
            setImageData(image)
          }}>
            <Icon material={<MdRefresh size={44} />} ios={<MdRefresh size={44} />} className='aspect-square' />
          </Button>
          <Button
            onClick={() => {
              // setShowDialog(true)
              setConfirmOpened(true)
              setResTitle('Confirm')
              setResMessage(null)
            }}
          >
            Save
          </Button>
        </div>
      </div>

      <Dialog
        opened={confirmOpened}
        onBackdropClick={() => setConfirmOpened(false)}
        title={resTitle || 'Confirm'}
        content={isLoading ? <div className='text-center'><Preloader /></div> : resMessage || 'Are you sure want to save this face?'}
        buttons={
          <>
            <DialogButton onClick={() => setConfirmOpened(false)} disabled={isLoading}>
              Cancel
            </DialogButton>
            <DialogButton strong onClick={handleSubmit} disabled={isLoading || resTitle === 'Error'}>
              Save
            </DialogButton>
          </>
        }
        colors={resTitle === 'Error' ? {
          titleIos: 'text-red-500',
          titleMaterial: 'text-red-500',
        } : undefined}
      />
    </Guest>
  )
}

export default NewFace