import React from 'react';
import { useStoreState } from '../Redux/hook';
import Select from 'react-select';
const MemberForm = (props) => {
    const { members } = useStoreState(state => state);
    return (React.createElement("form", { className: 'shadow border p-3 rounded' },
        React.createElement("label", { htmlFor: "member" }, "Pilih Member"),
        React.createElement(Select, { name: 'member', onChange: props.setSelectedMember, options: members.map(member => {
                return {
                    value: member.id,
                    label: member.username
                };
            }), isClearable: true })));
};
export default MemberForm;
