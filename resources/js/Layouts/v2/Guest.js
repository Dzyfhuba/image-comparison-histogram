import Navbar from '@/Containers/v2/Navbar';
import { Page } from 'konsta/react';
import React from 'react';
const Guest = (props) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("header", null,
            React.createElement(Navbar, null),
            React.createElement("main", null,
                React.createElement(Page, null, props.children)))));
};
export default Guest;
