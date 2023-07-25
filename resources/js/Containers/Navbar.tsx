import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import { MdOutlineAccountCircle, MdPeopleOutline } from 'react-icons/md'

const Navbar = () => {
  // const { url } = usePage()
  return (
    <nav className={`fixed bottom-0 border
     border-primary w-full z-50
      grid grid-rows-1 grid-flow-col
      h-14 rounded-t-2xl bg-white-1`}>
      <Link href='/' className='flex justify-center items-center'>
        <MdOutlineAccountCircle size={44} className={`${window.location.pathname === '/' ? 'text-primary' : 'text-neutral-1'}`} />
        <span className='hidden'>KYC</span>
      </Link>
      <Link href='/users' className='flex justify-center items-center'>
        <MdPeopleOutline size={44} className={`${window.location.pathname ===   '/users' ? 'text-primary' : 'text-neutral-1'}`} />
        <span className='hidden'>Members</span>
      </Link>
    </nav>
  )
}

export default Navbar
