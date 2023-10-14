import React, { useEffect, useState } from 'react';
import MemberForm from '@/Containers/MemberForm';
import Guest from '@/Layouts/Guest';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactImageUploading from 'react-images-uploading';
import Button from '@/Components/Button';
import { MdDelete, MdUpload } from 'react-icons/md';
import { ScaleLoader } from 'react-spinners';
const Dashboard = () => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [member, setMember] = useState();
    const [images, setImages] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const fetchData = async (memberId) => {
        if (!memberId)
            return;
        const member = await axios.get(`/api/members/${memberId}`)
            .then(res => {
            return res.data;
        })
            .catch(err => {
            console.error(err);
            Swal.fire({
                title: 'Error 500',
                icon: 'error'
            });
            return [];
        });
        setMember(member);
    };
    useEffect(() => {
        fetchData(selectedMember?.value || 0);
    }, [selectedMember]);
    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    const handleCalculate = async () => {
        const body = new FormData();
        // console.log('asd')
        if (selectedMember?.value) {
            body.append('id', selectedMember?.value ? '' + selectedMember.value : '0');
        }
        if (images.length) {
            body.append('kyc_image', images[0].file || '', '' + 'test');
        }
        setLoading(true);
        const score = await axios.post('/api/members/compare_similarity', body)
            .then(res => {
            return res.data;
        })
            .catch((err) => {
            console.error(err);
            Swal.fire({
                title: `Error ${err.response?.status || 500}`,
                icon: 'error'
            });
            return NaN;
        });
        setScore(score);
        setLoading(false);
    };
    return (React.createElement(Guest, { className: 'min-h-screen px-3' },
        React.createElement("h1", { className: 'text-2xl font-black underline' }, "Image Comparison"),
        React.createElement(MemberForm, { setSelectedMember: setSelectedMember }),
        React.createElement("div", { id: 'comparison', className: 'grid grid-cols-2 p-3 auto-rows-min mt-3 shadow rounded border gap-3' },
            React.createElement("h1", { className: 'col-span-full text-lg font-bold' }, "Image Comparison"),
            React.createElement("div", { id: "image-a" },
                React.createElement("h2", { className: 'text-center underline' }, "Image A"),
                React.createElement("img", { className: `h-28 outline outline-1 object-contain w-full ${member ? 'bg-black' : 'bg-neutral-200'}`, src: member ?
                        `/api/members/image/${member?.kyc_image}` :
                        '/images/No-Image-Found.png', alt: member?.username })),
            React.createElement("div", { id: "image-b" },
                React.createElement("h2", { className: 'text-center underline' }, "Image B"),
                React.createElement(ReactImageUploading, { value: images, onChange: onChange, acceptType: ['png'], dataURLKey: "data_url" }, ({ imageList, onImageUpload, onImageRemoveAll, isDragging, dragProps, }) => (
                // write your building UI
                React.createElement("div", { className: 'outline outline-1 h-28 flex justify-center relative bg-black' }, imageList.length ? (React.createElement(React.Fragment, null,
                    React.createElement("img", { className: 'h-28 object-contain', src: imageList[0]['data_url'] || '' }),
                    React.createElement("button", { className: `absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl`, onClick: onImageRemoveAll },
                        React.createElement(MdDelete, { size: 20 })))) : (React.createElement(Button, { onClick: onImageUpload, type: 'button', level: 'primary', className: 'w-full h-28 rounded-none', ...dragProps },
                    React.createElement(MdUpload, { className: 'mx-auto', size: isDragging ? 40 : undefined }),
                    !isDragging ? React.createElement("span", null, "Upload Image") : undefined)))))),
            React.createElement("div", { id: 'score', className: 'col-span-full text-center' },
                React.createElement(Button, { level: 'primary', onClick: () => handleCalculate(), disabled: isLoading }, isLoading ?
                    React.createElement(ScaleLoader, { height: 8, color: 'white' }) : 'Calculate'),
                React.createElement("div", null,
                    React.createElement("span", null,
                        "Score: ",
                        score * 100,
                        "%"))))));
};
export default Dashboard;
