import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label'
import Modal from '@/Components/Modal'
import { useStoreActions, useStoreState } from '@/Redux/hook'
import axios from 'axios';
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { MdImage, MdUpload, MdDelete } from 'react-icons/md';
import { GrPowerReset } from 'react-icons/gr';
import ReactImageUploading, { ImageListType } from 'react-images-uploading';
import Swal from 'sweetalert2';
import MemberInterface from '@/Interfaces/MemberInterface';

type Props = {
  mode: 'create' | 'edit'
  member?: MemberInterface
}

const Form = (props: Props) => {
  const { members } = useStoreState(state => state)
  const { fetchMembers } = useStoreActions(actions => actions)

  const [username, setUsername] = useState('')
  const [images, setImages] = useState<ImageListType>([])
  const [error, setError] = useState({
    member: '',
    images: ''
  })

  const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    console.log({ members, images })
    if (!(images.length && username !== '') && props.mode === 'create') {
      setError({
        images: !images.length ? 'Upload One' : '',
        member: !username ? 'Required' : '',
      })
      return
    }

    const body = new FormData()
    if (props.mode === 'create') {
      body.append('username', username)
    } else {
      body.append('_method', 'PUT')
    }
    body.append('kyc_image', images[0].file || '', '' + images[0])
    Swal.update({
      title: 'Loading',
      html: undefined
    })
    Swal.showLoading()
    axios.post(props.mode === 'create' ? '/api/members' : `/api/members/${props.member?.id}`, body)
      .then(res => {
        console.log(res.data)
        fetchMembers()
        Swal.hideLoading()
        Swal.update({
          icon: 'success',
          title: props.mode === 'create' ? 'Add New Member Successfully' : 'Update Member Successfully'
        })
      })
      .catch(err => {
        console.error(err)
        Swal.hideLoading()
        Swal.update({
          icon: 'error',
          title: 'Error 500',
        })
      })
  }

  useEffect(() => {
    if (username === '') {
      setError({
        ...error,
        member: ''
      })
    }

    if (images.length) {
      setError({
        ...error,
        images: ''
      })
    }
  }, [username, images])

  const onReset = () => {
    setImages([])
    setError({
      images: '',
      member: ''
    })
  }
  console.log(props.member)
  return (
    <form
      className='flex flex-col gap-3 p-3 text-start'
      onSubmit={onSubmit}
      onReset={onReset}
      autoComplete='off'
    >
      <Label htmlFor='member'>Member</Label>
      {
        <Input
          placeholder='Username Member'
          name='member'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          autoComplete="new-password"
          disabled={props.mode === 'edit'}
          value={props.mode === 'edit' ? props.member?.username : undefined}
          required
        />
      }
      {
        error.member && <small className='text-red-500'>{error.member}</small>
      }
      <ReactImageUploading
        value={images}
        onChange={onChange}
        acceptType={['png']}
      >
        {({
          onImageUpload,
          onImageRemoveAll,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="flex gap-3">
            <Button
              onClick={onImageUpload}
              type='button'
              level='primary'
              className='w-full'
              {...dragProps}
            >
              {
                images.length ? (
                  <>
                    <MdImage className='mx-auto' />
                    <span className='line-clamp-1'>{images[0].file?.name}</span>
                  </>
                ) : (
                  <>
                    <MdUpload className='mx-auto' size={isDragging ? 40 : undefined} />
                    {
                      !isDragging ? <span>Upload Image</span> : undefined
                    }
                  </>
                )
              }
            </Button>
            <Button
              level='danger'
              type='button'
              onClick={onImageRemoveAll}
            >
              <MdDelete />
            </Button>
          </div>
        )}
      </ReactImageUploading>
      {
        error.images && <small className='text-red-500'>{error.images}</small>
      }
      <div className="flex gap-3">
        <Button level='danger' type='reset'>
          <MdDelete />
        </Button>
        <Button level='success' type='submit' className='w-full'>
            Submit
        </Button>
      </div>
    </form>
  )
}

export default Form
