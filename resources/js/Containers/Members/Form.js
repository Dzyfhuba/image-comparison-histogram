import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import { useStoreActions, useStoreState } from '@/Redux/hook';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdImage, MdUpload, MdDelete } from 'react-icons/md';
import ReactImageUploading from 'react-images-uploading';
import Swal from 'sweetalert2';
const Form = (props) => {
    const { members } = useStoreState(state => state);
    const { fetchMembers } = useStoreActions(actions => actions);
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
        if (!(images.length && username !== '') && props.mode === 'create') {
            setError({
                images: !images.length ? 'Upload One' : '',
                member: !username ? 'Required' : '',
            });
            return;
        }
        const body = new FormData();
        if (props.mode === 'create') {
            body.append('username', username);
        }
        else {
            body.append('_method', 'PUT');
        }
        body.append('kyc_image', images[0].file || '', '' + images[0]);
        Swal.update({
            title: 'Loading',
            html: undefined
        });
        Swal.showLoading();
        axios.post(props.mode === 'create' ? '/api/members' : `/api/members/${props.member?.id}`, body)
            .then(res => {
            console.log(res.data);
            fetchMembers();
            Swal.hideLoading();
            Swal.update({
                icon: 'success',
                title: props.mode === 'create' ? 'Add New Member Successfully' : 'Update Member Successfully'
            });
        })
            .catch((err) => {
            console.error(err);
            Swal.hideLoading();
            Swal.update({
                icon: 'error',
                title: `Error ${err.response?.status || 500}`,
            });
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
    }, [username, images]);
    const onReset = () => {
        setImages([]);
        setError({
            images: '',
            member: ''
        });
    };
    console.log(props.member);
    return (React.createElement("form", { className: 'flex flex-col gap-3 p-3 text-start', onSubmit: onSubmit, onReset: onReset, autoComplete: 'off' },
        React.createElement(Label, { htmlFor: 'member' }, "Member"),
        React.createElement(Input, { placeholder: 'Username Member', name: 'member', onChange: (e) => setUsername(e.target.value), autoComplete: "new-password", disabled: props.mode === 'edit', value: props.mode === 'edit' ? props.member?.username : undefined, required: true }),
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
            React.createElement(Button, { level: 'danger', type: 'reset' },
                React.createElement(MdDelete, null)),
            React.createElement(Button, { level: 'success', type: 'submit', className: 'w-full' }, "Submit"))));
};
export default Form;
