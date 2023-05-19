/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SetStateAction } from 'react'
import SelectLibrary, { ActionMeta, GroupBase, OptionsOrGroups, PropsValue } from 'react-select'
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager'

interface Props {
  defaultValue?: never,
  onChange?: never,
  options?: never
}

// type Props = <Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: StateManagerProps<Option, IsMulti, Group> & RefAttributes<SelectLibrary<Option, IsMulti, Group>>) => ReactElement;

const Select = (props: Props) => {
  return (
    <SelectLibrary
      isClearable
      styles={{
        menu: (base) => base = {
          zIndex: '101 !important',
          borderRadius: 8,
          overflow: 'hidden',
        },
        control: base => base = {
          ...base,
          flexWrap: 'nowrap'
        }
      }}

      defaultValue={props.defaultValue}
      onChange={props.onChange}
      options={props.options}
    />
  )
}

export default Select
