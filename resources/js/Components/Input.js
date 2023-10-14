import React from 'react';
const Input = (props) => {
    return (React.createElement("input", { ...props, className: `p-2.5 rounded-md outline outline-1 outline-neutral-1 disabled:bg-neutral-200 disabled:text-neutral-500` }));
};
export default Input;
