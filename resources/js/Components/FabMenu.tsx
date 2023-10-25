import { useCamera } from "@/Actions/Camera";
import { useStoreActions } from "@/Redux/hook";
import { router } from "@inertiajs/react";
import { BlockTitle, Fab, List, ListButton, ListGroup, ListItem, Popover } from "konsta/react";
import React, { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const FabMenu = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const popoverTargetRef = useRef<HTMLElement | null>(null);
  const { setImage } = useStoreActions(state => state)

  const openPopover = (targetRef: HTMLElement) => {
    popoverTargetRef.current = targetRef;
    setPopoverOpened(true);
  };

  const { takePicture } = useCamera()

  const handleNewFace = async (path: string) => {
    const image = await takePicture()
    console.log(image)
    setImage(image)
    router.visit(path)
  }

  return (
    <>
      <Fab
        icon={<BsThreeDotsVertical />}
        className='fixed bottom-10-safe right-10-safe rounded-full force-dark'
        id='fab-menu'
        onClick={(e) => {
          openPopover(e.currentTarget);
        }}
      />
      <Popover
        opened={popoverOpened}
        target={popoverTargetRef.current}
        onBackdropClick={() => setPopoverOpened(false)}
      >
        <List nested>
          <ListButton onClick={() => handleNewFace('/new-face')}>New Face</ListButton>
          {/* <ListButton onClick={}>New Face</ListButton> */}
          <ListButton onClick={() => handleNewFace('/new-face?replace=1')}>Update Face</ListButton>
          <ListButton>Predict</ListButton>
        </List>
      </Popover >
    </>
  )
}

export default FabMenu