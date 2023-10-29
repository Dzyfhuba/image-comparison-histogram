import Navbar from '@/Containers/v2/Navbar'
import { Icon, Page, Tabbar, TabbarLink } from 'konsta/react'
import React, { useEffect, useState } from 'react'
import { App as KonstaApp } from 'konsta/react'
import { PageProps } from '@/types/page'
import { MdCameraFront, MdEmail, MdFileUpload, MdToday } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { router } from '@inertiajs/react'
import { BsCalendar, BsCloudUploadFill, BsEnvelopeFill } from 'react-icons/bs'

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
