import { AxiosGuest } from '@/Actions/Axios'
import { useCamera } from '@/Actions/Camera'
import { isValidUrl } from '@/Actions/Str'
import NoImage from '@/Images/No-Image-Found.png'
import Guest from "@/Layouts/v2/Guest"
import { useStoreState } from '@/Redux/hook'
import { PageProps } from '@/types/page'
import { Photo } from '@capacitor/camera'
import { router, useRemember } from '@inertiajs/react'
import axios, { AxiosError } from 'axios'
import imageCompression from 'browser-image-compression'
import { Button, Dialog, DialogButton, Icon, Link, List, ListInput, ListItem, Preloader, Toggle } from 'konsta/react'
import React, { ReactNode, useEffect, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { MdClose, MdRefresh } from 'react-icons/md'

const NewFace = (props: PageProps) => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const qsMode = urlSearchParams.get('mode')

  const { image } = useStoreState(state => state)
  const [username, setUsername] = useState('')
  const [isReplace, setReplace] = useState(!!parseInt(urlSearchParams.get('replace') || '0'))
  const [confirmOpened, setConfirmOpened] = useState(false);
  // const [imageData, setImageData] = useState<Photo | null>(image || null)
  const [imageData, setImageData] = useRemember(router.restore('image') as Photo || image || null, 'image')
  const [isLoading, setLoading] = useState(false)
  const [resMessage, setResMessage] = useState<ReactNode>(null)
  const [resTitle, setResTitle] = useState('')

  const { takePicture } = useCamera()

  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleSubmit = async () => {
    setLoading(true)
    setResTitle('Processing')
    if (!executeRecaptcha) {
      console.error('Execute recaptcha not found')
      return
    }

    const token = await executeRecaptcha('submit')
    console.log({ token })

    if (!token) {
      console.error('Token not found')
    }

    // verify token
    // const res = await axios.post('https://www.google.com/recaptcha/api/siteverify', {
    //   secret: import.meta.env.VITE_RECAPTCHA_SECRET_KEY,
    //   response: token,
    //   remoteip: props.request.ip
    // })

    // console.table(res)

    // return

    const body = new FormData()

    body.append('username', username || '')
    body.append('replace', isReplace ? 'true' : 'false')
    if (imageData?.webPath) {
      // fetch blob file with axios
      const { res, error } = await axios.get(imageData?.webPath, { responseType: 'blob' })
        .then(r => {
          return { res: r, error: null }
        })
        .catch(e => {
          return { error: e, res: null }
        })
      console.log(res?.data)

      // compress image under 2mb
      const compressed = await imageCompression(res?.data, {
        maxSizeMB: 2,
        useWebWorker: true,
        maxWidthOrHeight: 1000,
        onProgress: (progress) => {
          if(progress<100) setResTitle('Compressing')
          else setResTitle('Uploading')
        }
      })
      console.log({ compressed })

      // compressed blob to Photo type
      const compressedPhoto: Photo = {
        webPath: URL.createObjectURL(compressed),
        format: 'image/png',
        base64String: await imageCompression.getDataUrlFromFile(compressed),
        saved: false,
      }
      setImageData(compressedPhoto)
      
      // body.append('image', res?.data)
      body.append('image', compressed)
      // blob to file image png and append to form data
      // const file = new File([res?.data], 'image.png', { type: 'image/jpg' })

      // body.append('image', file)
      // console.log({ file })

      // console.log(res?.data)
    }

    const { data, error } = await AxiosGuest.post(`/api/lbph/${qsMode}`, body, {
      'headers': {
        'X-Token': token,
      }
    })
      .then(res => {
        console.log(res.data)

        return {
          data: res.data,
          error: null
        }
      })
      .catch((err) => {
        console.error(err.response)
        return {
          error: err.response?.data?.error as string || err.response?.data || { 'message': 'Something went wrong' },
          data: null
        }
      })
    setTimeout(() => {
      setLoading(false)

      // setLoading(false)

      if (error) {
        console.log(error)
        setResTitle('Error')
        if (JSON.stringify(error) === '{}') {
          setResMessage('Internal Server Error')
        } else {
          setResMessage(Object.values(error).map((err, idx) => <p key={idx}>{err as string}</p>))
        }
        return
      } else {
        if (qsMode == 'train') {
          setResTitle('Success')
          setResMessage(Object.keys(data).map((key, idx) => <p key={idx}>{key}: {data[key]}</p>))
        }

        if (qsMode == 'predict') {
          window.localStorage.setItem('predicted', data.result_path)
          setResTitle('Success')
          setResMessage(
            <table>
              <tbody>
                {
                  Object.keys(data).map((key, idx) =>
                    <tr key={idx}>
                      <td>{key}</td>
                      <td>:</td>
                      <td>{
                        // data[key] is url
                        isValidUrl(data[key]) ?
                          <a className='link' href={data[key]} target='_blank' rel="noreferrer">{(data[key] as string).split('/').pop()}</a> : data[key]
                      }</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          )
        }
      }
    }, 2000)
  }


  useEffect(() => {
    const arr = [
      'train',
      'predict'
    ]
    console.log({ qsMode })
    if (!(qsMode && arr.includes(qsMode)))
      router.replace('/')

    if (window.localStorage.getItem('image')) {
      setImageData(window.localStorage.getItem('image') ? JSON.parse(window.localStorage.getItem('image') as string) : null)
    }

    return () => {
      router.remember(router.restore('image'), 'image')
    }
  }, [])

  return (
    <Guest>
      <div className='h-screen flex flex-col p-3'>
        <img
          src={imageData?.webPath || NoImage}
          alt="captured image"
          className='h-3/5 w-full max-w-xl object-cover mx-auto border-black border rounded-md'
          onError={e => e.currentTarget.setAttribute('src', NoImage)}
        />
        <div>
          <form onSubmit={(e) => { e.preventDefault(); setConfirmOpened(true); setResTitle('Confirm'); setResMessage(null); document.getElementById('submit')?.focus() }}>
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
              {
                qsMode === 'train' && <ListItem
                  title='Update'
                  after={
                    <Toggle
                      checked={isReplace}
                      onChange={() => setReplace(!isReplace)}
                    />
                  }
                />
              }
            </List>
          </form>
          <div className='flex gap-1'>
            <Button clear className='w-min k-color-kred' tabIndex={1} onClick={() => router.visit('/')}>
              <Icon material={<MdClose size={44} />} ios={<MdClose size={44} />} className='aspect-square' />
            </Button>
            <Button clear className='w-min k-color-yellow' onClick={async () => {
              const image = await takePicture()
              setImageData(image)
              router.remember(image, 'image')
              window.localStorage.setItem('image', JSON.stringify(image))
            }}>
              <Icon material={<MdRefresh size={44} />} ios={<MdRefresh size={44} />} className='aspect-square' />
            </Button>
            <Button
              onClick={() => {
                // setShowDialog(true)
                setConfirmOpened(true)
                setResTitle('Confirm')
                setResMessage(null)
                document.getElementById('submit')?.focus()
              }}
            >
              {qsMode === 'train' ? 'Save' : 'Predict'}
            </Button>
          </div>
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
              {
                resTitle === 'Success' ? 'Close' : 'Cancel'
              }
            </DialogButton>
            <DialogButton
              strong
              onClick={resTitle === 'Success' ? () => {
                setConfirmOpened(false)
                router.replace('/')
              } : handleSubmit}
              disabled={isLoading || resTitle === 'Error'}
              id='submit'
            >
              {
                resTitle === 'Success' ? 'Back' : 'Confirm'
              }
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