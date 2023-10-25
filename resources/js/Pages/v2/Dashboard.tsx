import FabMenu from '@/Components/FabMenu'
import Predicted from '@/Containers/v2/Predicted'
import Guest from '@/Layouts/v2/Guest'
import { PageProps } from '@/types/page'
import { Fab, List, ListButton, ListItem, MenuList, MenuListItem, Popover } from 'konsta/react'
import React, { useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

const Dashboard = (props: PageProps) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const popoverTargetRef = useRef(null);

  const openPopover = (targetRef: string) => {
    popoverTargetRef.current = targetRef as never
    setPopoverOpened(true);
  };

  return (
    <Guest>
      <Predicted />
      
      <FabMenu />

      <div className='-right-18 top-5 fixed bg-red-700 text-white rotate-45 w-52 text-center'>
        {props.agent.os}
      </div>
    </Guest>
  )
}

export default Dashboard