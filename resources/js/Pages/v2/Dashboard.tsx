import FabMenu from '@/Components/FabMenu'
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

      Dashboard
      {props.agent.os}
      <FabMenu />
    </Guest>
  )
}

export default Dashboard