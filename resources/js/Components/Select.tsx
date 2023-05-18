/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import SelectLibrary, { ActionMeta, GroupBase, OptionsOrGroups, PropsValue } from 'react-select'
import StateManagedSelect from 'react-select/dist/declarations/src/stateManager'

interface Props extends StateManagedSelect {
  defaultValue?: PropsValue<null>,
  onChange?: ((newValue: null, actionMeta: ActionMeta<null>) => void),
  options: OptionsOrGroups<null, GroupBase<null>>
}

// type Props = <Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: StateManagerProps<Option, IsMulti, Group> & RefAttributes<SelectLibrary<Option, IsMulti, Group>>) => ReactElement;

const Select = (props: Props) => {
  return (
    <SelectLibrary
      {...props}
      styles={{
        menu: (base) => base = {
          zIndex: 101,
          borderRadius: 8,
          overflow: 'hidden',
        },
      }}
    />
  )
}

export default Select
