import { BlockTitle, Card } from 'konsta/react'
import React, { useEffect, useMemo, useState } from 'react'
import NoImage from '@/Images/No-Image-Found.png'

const Predicted = () => {
  const [predicted, setPredicted] = useState('')

  useEffect(() => {
    setPredicted(window.localStorage.getItem('predicted') || '')
  }, [])

  return (
    <section>
      <Card>
        <h2 className='text-xl'>Predicted</h2>
        <img 
          src={predicted}
          alt="predicted"
          className='max-w-xl mx-auto w-full h-3/5'
          onError={e => e.currentTarget.setAttribute('src', NoImage)}
        />
      </Card>
    </section>
  )
}

export default Predicted