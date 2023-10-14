import Navbar from '@/Containers/v2/Navbar'
import { Page } from 'konsta/react'
import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement>

const Guest = (props: Props) => {
  return (
    <>
      <header>
        <Navbar />

        <main>
          <Page>
            {props.children}
          </Page>
        </main>
      </header>
    </>
  )
}

export default Guest
