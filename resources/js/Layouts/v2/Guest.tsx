import Navbar from '@/Containers/v2/Navbar'
import { Page } from 'konsta/react'
import React from 'react'
import { App as KonstaApp } from 'konsta/react'
import { PageProps } from '@/types/page'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  agent?: PageProps['agent']
}

const Guest = (props: Props) => {
  return (
    <KonstaApp theme={props.agent?.os == 'iOS' ? 'ios' : 'material'}>
      <header>
        <Navbar />

        <main>
          <Page>
            {props.children}
          </Page>
        </main>
      </header>
    </KonstaApp>
  )
}

export default Guest
