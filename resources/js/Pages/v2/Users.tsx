import Guest from '@/Layouts/v2/Guest'
import { PageProps } from '@/types/page'
import { Table, TableBody, TableCell, TableHead, TableRow } from 'konsta/react'
import React from 'react'

const Users = (props: PageProps) => {
  return (
    <Guest>
      <h1>Users</h1>

      <Table>
        <TableHead>
          <TableRow header>
            <TableCell header>ID</TableCell>
            <TableCell header>Username</TableCell>
            <TableCell header>Trained Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                <img src={`/users/trained-image/${user.trained_image}`} alt={`${import.meta.env.VITE_APP_NAME} ${user.username}`} className='h-14 w-14 object-cover' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Guest>
  )
}

export default Users