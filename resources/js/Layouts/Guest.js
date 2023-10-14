import React, { useEffect } from 'react';
import Navbar from '@/Containers/Navbar';
import { useStoreActions } from '@/Redux/hook';
const Guest = (props) => {
    const { fetchMembers } = useStoreActions(actions => actions);
    useEffect(() => {
        fetchMembers();
    }, []);
    return (React.createElement("div", null,
        React.createElement("header", null,
            React.createElement(Navbar, null)),
        React.createElement("main", { className: 'px-3' }, props.children)));
};
export default Guest;
