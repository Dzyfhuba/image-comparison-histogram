import { Link } from '@inertiajs/react';
import React from 'react';
import { MdOutlineAccountCircle, MdPeopleOutline } from 'react-icons/md';
const Navbar = () => {
    // const { url } = usePage()
    return (React.createElement("nav", { className: `fixed bottom-0 border
     border-primary w-full z-50
      grid grid-rows-1 grid-flow-col
      h-14 rounded-t-2xl bg-white-1` },
        React.createElement(Link, { href: '/', className: 'flex justify-center items-center' },
            React.createElement(MdOutlineAccountCircle, { size: 44, className: `${window.location.pathname === '/' ? 'text-primary' : 'text-neutral-1'}` }),
            React.createElement("span", { className: 'hidden' }, "KYC")),
        React.createElement(Link, { href: '/users', className: 'flex justify-center items-center' },
            React.createElement(MdPeopleOutline, { size: 44, className: `${window.location.pathname === '/users' ? 'text-primary' : 'text-neutral-1'}` }),
            React.createElement("span", { className: 'hidden' }, "Members"))));
};
export default Navbar;
