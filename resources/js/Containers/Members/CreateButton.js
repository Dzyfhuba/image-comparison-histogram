import Button from '@/Components/Button';
import { useStoreActions } from '@/Redux/hook';
import React from 'react';
import { GoPlus } from 'react-icons/go';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Form from './Form';
import store from '@/Redux/store';
import { StoreProvider } from 'easy-peasy';
const CreateButton = () => {
    const { setModalVisibility } = useStoreActions(actions => actions);
    const ReactSwal = withReactContent(Swal);
    const handleClick = (e) => {
        console.log(e.target);
        const input = ReactSwal.fire({
            title: 'Add New Member',
            showConfirmButton: false,
            html: (React.createElement(StoreProvider, { store: store },
                React.createElement(Form, { mode: 'create' })))
        });
    };
    return (React.createElement(Button, { className: `bg-primary rounded-full p-3 border border-primary
      fixed bottom-16 right-2 hover:bg-white-1 hover:text-primary
        transition-colors duration-300 text-white`, onClick: handleClick },
        React.createElement(GoPlus, { size: 20 })));
};
export default CreateButton;
