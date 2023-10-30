import Navbar from '@/Containers/v2/Navbar'
import { PageProps } from '@/types/page'
import { router } from '@inertiajs/react'
import { Icon, App as KonstaApp, Page, Tabbar, TabbarLink } from 'konsta/react'
import React, { useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { MdCameraFront } from 'react-icons/md'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  agent?: PageProps['agent']
}

const Guest = (props: Props) => {
  const [activePath, setActivePath] = useState<string>(window.location.pathname)

  return (
    <KonstaApp
      theme={props.agent?.os == 'iOS' ? 'ios' : 'material'}
    // theme='ios'
    >
      <header>
        <Navbar />
      </header>

      <main>
        <Page
        // className='min-h-[150vh]'
        >
          {props.children}
        </Page>
      </main>
      <Tabbar
        className='fixed bottom-0'
        style={{ zIndex: 5 }}
        hidden={!['/', '/users'].includes(activePath)}
      >
        <TabbarLink
          active={activePath === '/'}
          onClick={() => {
            router.visit('/')
            setActivePath('/')
          }}
          icon={
            <Icon
              ios={<MdCameraFront size={44} />}
              material={<MdCameraFront size={44} />}
            />
          }
        />
        <TabbarLink
          active={activePath === '/users'}
          onClick={() => {
            router.visit('/users')
            setActivePath('/users')
          }}
          icon={
            <Icon
              ios={<FaUsers size={44} />}
              material={<FaUsers size={44} />}
            />
          }
        />
      </Tabbar>
    </KonstaApp>
  )
}

export default Guest
