import React from 'react';
const Label = (props) => {
    return (React.createElement("label", { ...props, className: `block ${props.className}` }, props.children));
};
export default Label;
