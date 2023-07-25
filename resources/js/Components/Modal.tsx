import { useStoreActions, useStoreState } from '@/Redux/hook'
import React, { CSSProperties, HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import Button from './Button'

interface Props extends HTMLAttributes<HTMLElement> {
  header?: ReactNode
}

const Modal = (props: Props) => {
  const { modalVisibility } = useStoreState(state => state)
  const { setModalVisibility } = useStoreActions(actions => actions)

  const styleDefault:CSSProperties = {
    top: 32,
    left: '50%',
    // height: '1000px',
    transform: 'translateX(-50%)',
    overflowX: 'hidden',
    overflowY: 'hidden',
    maxWidth: 400
  }
  const styleOpen: CSSProperties= {
    width: '80vw',
    padding: '12px 12px'
  }
  const styleClose: CSSProperties= {
    width: 0,
    padding: '12px 0'
  }
  const [style, setStyle] = useState<CSSProperties>({})
  const [modalVisibilityEnd, setModalVisibilityEnd] = useState(false)

  useEffect(() => {
    if (modalVisibility) {
      setStyle(styleOpen)
      setModalVisibilityEnd(modalVisibility)
    } else {
      setStyle(styleClose)
      setTimeout(() => {
        setModalVisibilityEnd(modalVisibility)
      }, 300)
    }
  }, [modalVisibility])

  return (
    <>
      <div
        className={`transition-all duration-300 bg-white-1 z-[100] fixed
          rounded-md overflow-hidden whitespace-nowrap
          ${modalVisibilityEnd || modalVisibility ? '' : ' hidden'}`}
        style={{ ...style, ...styleDefault }}
      >
        <div className='flex justify-between'>
          <h2>
            {props.header}
          </h2>
          <Button
            className='hover:text-neutral-1'
            onClick={() => setModalVisibility(false)}
          >
            <MdClose size={16} />
          </Button>
        </div>
        {props.children}
      </div>
      {
        (modalVisibilityEnd) &&
        <div
          className={`fixed top-0 left-0 w-full h-full z-[99]
            ${modalVisibilityEnd ? ' backdrop-brightness-75' : ''}`}
          onClick={() => setModalVisibility(false)}
        />
      }
    </>
  )
}

export default Modal
