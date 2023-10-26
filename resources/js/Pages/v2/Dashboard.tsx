import FabMenu from '@/Components/FabMenu'
import Predicted from '@/Containers/v2/Predicted'
import PredictedLogs from '@/Containers/v2/PredictedLogs'
import Guest from '@/Layouts/v2/Guest'
import { PageProps } from '@/types/page'
import React from 'react'

const Dashboard = (props: PageProps) => {

  return (
    <Guest>
      <Predicted />
      <PredictedLogs data={props.predictedLogs} />
      
      <FabMenu />

      <div className='-right-18 top-5 fixed bg-red-700 text-white rotate-45 w-52 text-center'>
        {props.agent.os}
      </div>
    </Guest>
  )
}

export default Dashboard