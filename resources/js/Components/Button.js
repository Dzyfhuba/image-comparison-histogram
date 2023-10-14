import React from 'react';
const Button = (props) => {
    if (props.level === 'primary') {
        return (React.createElement("button", { ...props, className: `bg-primary px-5 rounded-md border border-primary hover:bg-white-1 hover:text-primary
        transition-colors duration-300 text-white
        disabled:bg-neutral-500 disabled:hover:bg-neutral-400 disabled:hover:text-white disabled:border-neutral-400
        ${props.className ? ' ' + props.className : ''}` }, props.children));
    }
    if (props.level === 'danger') {
        return (React.createElement("button", { ...props, className: `bg-red-500 px-5 rounded-md border border-red-500 hover:bg-white-1 hover:text-red-500
        transition-colors duration-300 text-white${props.className ? ' ' + props.className : ''}` }, props.children));
    }
    if (props.level === 'success') {
        return (React.createElement("button", { ...props, className: `bg-green-500 px-5 rounded-md border border-green-500 hover:bg-white-1 hover:text-green-500
        transition-colors duration-300 text-white${props.className ? ' ' + props.className : ''}` }, props.children));
    }
    return (React.createElement("button", { ...props, className: `${props.className}` }, props.children));
};
export default Button;
