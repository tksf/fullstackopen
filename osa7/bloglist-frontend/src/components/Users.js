import React, { useEffect } from 'react'
// import userService from '../services/users'
import { initializeUsers } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import {
  Link, useParams
} from 'react-router-dom'

export const User = () => {

  const id = useParams().id
  console.log(id)
  // const id = '5e97085169087bccac0689b0'
  const blogs = useSelector(state => state.blogs.filter((b) => {return b.user.id === String(id)}))

  if ( blogs.length === 0 ) {
    return null
  } else {
    console.log('User and his blogs: ', id, blogs)

    return (
      <div>
        <h2>User {blogs[0].user.name} blogs</h2>
        <div>
          {blogs.map(blog =>
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )}
        </div>
      </div>
    )
  }
}

const Users = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  },[])

  const users = useSelector(state => state.users)
  const currentUser = useSelector(state => state.login)

  users.forEach(u => {
    console.log(`${u.name} has ${u.blogs.length} blogs`)
  })

  console.log('kayttajat: ', users)
  // {Object.entries(blog_users).map(([key, value]) => {
  //   return (
  //     <>
  //       <tr>
  //         <td style={t_style}>{key}</td>
  //         <td style={t_style}>{value}</td>
  //       </tr>
  //     </>
  //   )
  // })}

  if (!users || !currentUser) {
    return null
  } else {
    return (
      <div>
        <h2>Users</h2>
        <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>blogs created</th>
              </tr>
                {users.map(u => 
                 <tr key={u.id}>
                  <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                  <td>{u.blogs.length}</td>
                </tr>
                  )
                }
            </tbody>
          </table>
        </div>
      </div>
    )}
}

export default Users
