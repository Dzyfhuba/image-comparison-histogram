import { useStoreActions, useStoreState } from '@/Redux/hook';
import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import Button from './Button';
const Modal = (props) => {
    const { modalVisibility } = useStoreState(state => state);
    const { setModalVisibility } = useStoreActions(actions => actions);
    const styleDefault = {
        top: 32,
        left: '50%',
        // height: '1000px',
        transform: 'translateX(-50%)',
        overflowX: 'hidden',
        overflowY: 'hidden',
        maxWidth: 400
    };
    const styleOpen = {
        width: '80vw',
        padding: '12px 12px'
    };
    const styleClose = {
        width: 0,
        padding: '12px 0'
    };
    const [style, setStyle] = useState({});
    const [modalVisibilityEnd, setModalVisibilityEnd] = useState(false);
    useEffect(() => {
        if (modalVisibility) {
            setStyle(styleOpen);
            setModalVisibilityEnd(modalVisibility);
        }
        else {
            setStyle(styleClose);
            setTimeout(() => {
                setModalVisibilityEnd(modalVisibility);
            }, 300);
        }
    }, [modalVisibility]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `transition-all duration-300 bg-white-1 z-[100] fixed
          rounded-md overflow-hidden whitespace-nowrap
          ${modalVisibilityEnd || modalVisibility ? '' : ' hidden'}`, style: { ...style, ...styleDefault } },
            React.createElement("div", { className: 'flex justify-between' },
                React.createElement("h2", null, props.header),
                React.createElement(Button, { className: 'hover:text-neutral-1', onClick: () => setModalVisibility(false) },
                    React.createElement(MdClose, { size: 16 }))),
            props.children),
        (modalVisibilityEnd) &&
            React.createElement("div", { className: `fixed top-0 left-0 w-full h-full z-[99]
            ${modalVisibilityEnd ? ' backdrop-brightness-75' : ''}`, onClick: () => setModalVisibility(false) })));
};
export default Modal;
