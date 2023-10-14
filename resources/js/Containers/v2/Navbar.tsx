import React from 'react'
import { Navbar as KNavbar } from 'konsta/react'
import LogoImageLight from '@/Images/logo-long-light.png'
import LogoImageDark from '@/Images/logo-long-dark.png'

const Navbar = () => {
  return (
    <KNavbar
      title={<Logo />}
      titleClassName='h-3/5'
      className='hidden'
    />
  )
}

export default Navbar

const Logo = () => {
  return (
    <>
      <img src={LogoImageLight} alt="title" className='dark:hidden h-full' />
      <img src={LogoImageDark} alt="title" className='hidden dark:block h-full' />
    </>
  )
}