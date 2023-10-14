import Guest from '@/Layouts/v2/Guest';
import { Fab } from 'konsta/react';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
const Dashboard = () => {
    return (React.createElement(Guest, null,
        "Dashboard",
        React.createElement(Fab, { icon: React.createElement(BsThreeDotsVertical, null), className: 'fixed bottom-10-safe right-10-safe rounded-full' })));
};
export default Dashboard;
