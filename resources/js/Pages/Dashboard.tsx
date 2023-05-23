import React, { useEffect, useState } from 'react'
import MemberForm from '@/Containers/MemberForm'
import Guest from '@/Layouts/Guest'
import { SingleValue } from 'react-select'
import MemberInterface from '@/Interfaces/MemberInterface'
import axios, { AxiosError } from 'axios'
import Swal from 'sweetalert2'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Zoom from 'react-medium-image-zoom'
import ReactImageUploading, { ImageListType } from 'react-images-uploading'
import Button from '@/Components/Button'
import { MdDelete, MdImage, MdUpload } from 'react-icons/md'
import { ScaleLoader } from 'react-spinners'

type Option = {
  label: string
  value: number
}

const Dashboard = () => {
  const [selectedMember, setSelectedMember] = useState<SingleValue<Option>>(null)
  const [member, setMember] = useState<MemberInterface>()
  const [images, setImages] = useState<ImageListType>([])

  const [score, setScore] = useState<number>(0)
  const [isLoading, setLoading] = useState(false)

  const fetchData = async (memberId: number) => {
    if (!memberId) return

    const member = await axios.get(`/api/members/${memberId}`)
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.error(err)
        Swal.fire({
          title: 'Error 500',
          icon: 'error'
        })
        return []
      })
    setMember(member)
  }
  
  useEffect(() => {
    fetchData(selectedMember?.value || 0)
  }, [selectedMember])

  const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleCalculate = async () => {
    const body = new FormData()
    // console.log('asd')
    
    body.append('id', selectedMember?.value ? '' + selectedMember.value : '0')
    if (images.length) {
      body.append('kyc_image', images[0].file || '', '' + 'test')
    }

    setLoading(true)
    const score = await axios.post('/api/members/compare_similarity', body)
      .then(res => {
        return res.data
      })
      .catch((err: AxiosError) => {
        console.error(err)
        Swal.fire({
          title: `Error ${err.response?.status || 500}`,
          icon: 'error'
        })
        return NaN
      })
    setScore(score)
    setLoading(false)
  }
  
  return (
    <Guest className='min-h-screen px-3'>
      <h1 className='text-2xl font-black underline'>Image Comparison</h1>
      <MemberForm setSelectedMember={setSelectedMember} />
      <div
        id='comparison'
        className='grid grid-cols-2 p-3 auto-rows-min mt-3 shadow rounded border gap-3'
      >
        <h1 className='col-span-full text-lg font-bold'>
          Image Comparison
        </h1>
        <div id="image-a">
          <h2 className='text-center underline'>
            Image A
          </h2>
          <img
            className={`h-28 outline outline-1 object-contain w-full ${member ? 'bg-black' : 'bg-neutral-200'}`}
            src={
              member ?
                `/api/members/image/${member?.kyc_image}` : 
                '/images/No-Image-Found.png'
            }
            alt={member?.username} 
          />
        </div>
        <div id="image-b">
          <h2 className='text-center underline'>
            Image B
          </h2>
          <ReactImageUploading
            value={images}
            onChange={onChange}
            acceptType={['png']}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className='outline outline-1 h-28 flex justify-center relative bg-black'>
                {
                  imageList.length ? (
                    <>
                      <img
                        className='h-28 object-contain'
                        src={imageList[0]['data_url'] || ''}
                      />
                      <button
                        className={`absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl`}
                        onClick={onImageRemoveAll}
                      >
                        <MdDelete size={20} />
                      </button>
                    </>
                  ) : (
                    <Button
                      onClick={onImageUpload}
                      type='button'
                      level='primary'
                      className='w-full h-28 rounded-none'
                      {...dragProps}
                    >
                      <MdUpload className='mx-auto' size={isDragging ? 40 : undefined} />
                      {
                        !isDragging ? <span>Upload Image</span> : undefined
                      }
                    </Button>
                  )
                }
              </div>
            )}
          </ReactImageUploading>
        </div>
        <div id='score' className='col-span-full text-center'>
          <Button
            level='primary'
            onClick={() => handleCalculate()}
            disabled={isLoading}
          >
            {
              isLoading ? 
                <ScaleLoader height={8} color='white' /> : 'Calculate'
            }
          </Button>
          <div>
            <span>Score: {score*100}%</span>
          </div>
        </div>
      </div>
    </Guest>
  )
}

export default Dashboard
