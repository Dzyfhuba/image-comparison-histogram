/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import SelectLibrary from 'react-select';
// type Props = <Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: StateManagerProps<Option, IsMulti, Group> & RefAttributes<SelectLibrary<Option, IsMulti, Group>>) => ReactElement;
const Select = (props) => {
    return (React.createElement(SelectLibrary, { isClearable: true, styles: {
            menu: (base) => base = {
                zIndex: '101 !important',
                borderRadius: 8,
                overflow: 'hidden',
            },
            control: base => base = {
                ...base,
                flexWrap: 'nowrap'
            }
        }, defaultValue: props.defaultValue, onChange: props.onChange, options: props.options }));
};
export default Select;
