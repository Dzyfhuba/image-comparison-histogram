import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Modal from '@/Components/Modal';
import { useStoreActions, useStoreState } from '@/Redux/hook';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdImage, MdUpload, MdDelete } from 'react-icons/md';
import ReactImageUploading from 'react-images-uploading';
import Swal from 'sweetalert2';
const CreateForm = () => {
    const { members, modalVisibility } = useStoreState(state => state);
    const { fetchMembers, setModalVisibility } = useStoreActions(actions => actions);
    const [username, setUsername] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState({
        member: '',
        images: ''
    });
    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log({ members, images });
        if (!(images.length && username !== '')) {
            setError({
                images: !images.length ? 'Upload One' : '',
                member: !username ? 'Required' : '',
            });
            return;
        }
        const body = new FormData();
        body.append('username', username);
        body.append('kyc_image', images[0].file || '', '' + images[0]);
        axios.post('/api/members', body)
            .then(res => {
            console.log(res.data);
            fetchMembers();
            Swal.fire({
                title: 'Add New Member Successfully',
                icon: 'success'
            })
                .then(() => {
                setModalVisibility(false);
            });
        })
            .catch(err => {
            console.error(err);
        });
    };
    useEffect(() => {
        if (username === '') {
            setError({
                ...error,
                member: ''
            });
        }
        if (images.length) {
            setError({
                ...error,
                images: ''
            });
        }
        // if (modalVisibility) {
        //   console.log('test')
        // }
        setModalVisibility(true);
    }, [username, images, modalVisibility]);
    const onReset = () => {
        setImages([]);
        setError({
            images: '',
            member: ''
        });
    };
    return (React.createElement(Modal, { header: 'Tambah Member Baru' },
        React.createElement("form", { className: 'flex flex-col gap-3', onSubmit: onSubmit, onReset: onReset, autoComplete: 'off' },
            React.createElement(Label, { htmlFor: 'member' }, "Member"),
            React.createElement(Input, { placeholder: 'Username Member', name: 'member', onChange: (e) => setUsername(e.target.value), autoComplete: "new-password", required: true }),
            error.member && React.createElement("small", { className: 'text-red-500' }, error.member),
            React.createElement(ReactImageUploading, { value: images, onChange: onChange, acceptType: ['png'] }, ({ onImageUpload, onImageRemoveAll, isDragging, dragProps, }) => (
            // write your building UI
            React.createElement("div", { className: "flex gap-3" },
                React.createElement(Button, { onClick: onImageUpload, type: 'button', level: 'primary', className: 'w-full', ...dragProps }, images.length ? (React.createElement(React.Fragment, null,
                    React.createElement(MdImage, { className: 'mx-auto' }),
                    React.createElement("span", { className: 'line-clamp-1' }, images[0].file?.name))) : (React.createElement(React.Fragment, null,
                    React.createElement(MdUpload, { className: 'mx-auto', size: isDragging ? 40 : undefined }),
                    !isDragging ? React.createElement("span", null, "Upload Image") : undefined))),
                React.createElement(Button, { level: 'danger', type: 'button', onClick: onImageRemoveAll },
                    React.createElement(MdDelete, null))))),
            error.images && React.createElement("small", { className: 'text-red-500' }, error.images),
            React.createElement("div", { className: "flex gap-3" },
                React.createElement(Button, { level: 'danger', type: 'reset' }, "Reset"),
                React.createElement(Button, { level: 'success', type: 'submit', className: 'w-full' }, "Submit")))));
};
export default CreateForm;
