import React, { ReactNode, useEffect, useState } from 'react'
import { Card, Link, Sheet, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from "konsta/react"
import { PredictedLog } from '@/types/predicted-logs'
import moment from 'moment'
import 'moment/locale/id'
moment.locale('id')

type Props = {
  data: PredictedLog[]
}

const PredictedLogs = (props: Props) => {
  const columns = [
    'id',
    'result path',
    'user id',
    'score',
    'diff time',
    'created at',
  ]
  const [sheetOpened, setSheetOpened] = useState(false);
  const [sheetContent, setSheetContent] = useState<ReactNode>(null)

  // function to convert current date with certain date in seconds ago, minutes ago, hours ago, days ago, weeks ago, months ago, years ago using moment
  const diffDate = (date: string) => {
    const currentDate = moment(new Date())
    const createdDate = moment(date)
    const diff = currentDate.diff(createdDate, 'seconds')

    if (diff < 60) {
      return `${diff} seconds ago`
    } else if (diff < 3600) {
      return `${currentDate.diff(createdDate, 'minutes')} minutes ago`
    } else if (diff < 86400) {
      return `${currentDate.diff(createdDate, 'hours')} hours ago`
    } else if (diff < 604800) {
      return `${currentDate.diff(createdDate, 'days')} days ago`
    } else if (diff < 2592000) {
      return `${currentDate.diff(createdDate, 'weeks')} weeks ago`
    } else if (diff < 31536000) {
      return `${currentDate.diff(createdDate, 'months')} months ago`
    } else {
      return `${currentDate.diff(createdDate, 'years')} years ago`
    }
  }

  useEffect(() => {
    if (!sheetOpened) {
      setSheetContent('')

    }
  }, [sheetOpened])

  return (
    <>
      <section>
        <Card>
          <h2 className='text-xl'>Predicted Logs</h2>

          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow header>
                  {
                    columns.map((column, index) => (
                      <TableCell header key={index} className='capitalize'>{column}</TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  props.data.map((log, index) => (
                    <TableRow
                      onClick={() => {
                        setSheetOpened(true)
                        setSheetContent(
                          <img src={`/lbph/score/${log.result_path}`} alt='preview' className='object-center w-full h-full object-contain' />
                        )
                      }}
                      key={index}
                      className='hover:cursor-pointer touch-ripple-current'
                      colors={{
                        bgIos: 'hover:bg-black/5 dark:hover:bg-white/10 hover:cursor-pointer touch-ripple-current',
                        bgMaterial: 'hover:bg-md-light-secondary-container dark:hover:bg-md-dark-secondary-container hover:cursor-pointer touch-ripple-current'
                      }}
                    >
                      <TableCell hidden>{log.id}</TableCell>
                      <TableCell>
                        {log.result_path}
                        {/* <a href={`/lbph/score/${log.result_path}`} target='_blank' rel="noreferrer" className='link'>
                        {log.result_path}
                      </a> */}
                      </TableCell>
                      <TableCell>{log.username}</TableCell>
                      <TableCell>{log.score}</TableCell>
                      <TableCell>{diffDate(log.created_at)}</TableCell>
                      <TableCell>{moment(log.created_at).format('DD MMM YYYY HH:mm:ss')}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>
      <Sheet
        className="pb-safe w-full h-full max-h-[50vh] bg-base-200"
        opened={sheetOpened}
        onBackdropClick={() => setSheetOpened(false)}
      >
        <Toolbar top>
          <div className="left" />
          <div className="right">
            <Link toolbar onClick={() => setSheetOpened(false)}>
              Close
            </Link>
          </div>
        </Toolbar>
        <div className='h-4/5'>
          {sheetContent}
        </div>
      </Sheet>
    </>
  )
}

export default PredictedLogs