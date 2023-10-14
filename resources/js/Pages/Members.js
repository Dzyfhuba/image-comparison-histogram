import Button from '@/Components/Button';
import CreateButton from '@/Containers/Members/CreateButton';
import Form from '@/Containers/Members/Form';
import Guest from '@/Layouts/Guest';
import { useStoreActions, useStoreState } from '@/Redux/hook';
import store from '@/Redux/store';
import axios from 'axios';
import { StoreProvider } from 'easy-peasy';
import React, { useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { nanoid } from 'nanoid';
import { MdDelete } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const Members = () => {
    const { members } = useStoreState(state => state);
    const { setMembers } = useStoreActions(state => state);
    const ReactSwal = withReactContent(Swal);
    const fetchData = async () => {
        const members = await axios.get('/api/members')
            .then(res => {
            return res.data;
        })
            .catch(error => {
            console.error(error);
            return [];
        });
        setMembers(members);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleEdit = (member) => {
        ReactSwal.fire({
            title: 'Edit Member',
            showConfirmButton: false,
            html: (React.createElement(StoreProvider, { store: store },
                React.createElement(Form, { mode: 'edit', member: member })))
        });
    };
    const handleDelete = async (member) => {
        Swal.fire({
            title: `Sure Delete username: ${member.username}?`,
            text: 'Can\'t restore after deleted',
            icon: 'warning',
            confirmButtonColor: '#f00',
            confirmButtonText: 'Delete',
            showCancelButton: true,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const success = await axios.delete(`/api/members/${member.id}`)
                    .then(() => {
                    return true;
                })
                    .catch(err => {
                    console.error(err);
                    return false;
                });
                return success;
            }
        })
            .then(async ({ value }) => {
            if (value) {
                fetchData();
                Swal.fire({
                    icon: 'success',
                    title: 'Delete Member Successfully',
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error 500',
                });
            }
            // Swal.update({
            //   title: 'Loading',
            //   html: undefined
            // })
            // Swal.showLoading()
        });
    };
    return (React.createElement(Guest, { className: 'min-h-screen px-3' },
        React.createElement("h1", { className: 'text-2xl font-black underline' }, "Kelola Members"),
        React.createElement("ul", { className: 'flex flex-col gap-3' }, members.map(member => (React.createElement("li", { key: member.id, className: 'shadow-md border border-primary rounded-2xl p-3 flex flex-col flex-wrap h-32 gap-1' },
            React.createElement("span", null, `Member ID: ${member.id}`),
            React.createElement("span", null, `Username: ${member.username}`),
            React.createElement("span", null, new Date(member.updated_at).toLocaleString('id')),
            React.createElement("span", null,
                React.createElement(Zoom, null,
                    React.createElement(LazyLoadImage, { src: `/api/members/image/${member.kyc_image}`, alt: member.username, className: 'w-16 h-16 object-contain mx-auto', key: nanoid(), useIntersectionObserver: true }))),
            React.createElement("span", { className: 'flex-grow flex items-end justify-end gap-1' },
                React.createElement(Button, { level: 'primary', onClick: () => handleEdit(member) }, "Edit"),
                React.createElement(Button, { level: 'danger', onClick: () => handleDelete(member), style: { padding: 0 } },
                    React.createElement(MdDelete, { size: 24 }))))))),
        React.createElement(CreateButton, null)));
};
export default Members;
