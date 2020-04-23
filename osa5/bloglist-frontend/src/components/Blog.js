import React, { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ blog }) => {
  const [ longForm, setLongForm ] = useState(false)

  // console.log(blog)

  const shortWhenLong = { display: longForm ? 'none' : '' }
  const longWhenShort = { display: longForm ? '' : 'none' }

  const addLike = (blog) => {
    blog.likes = blog.likes + 1

    blogService.update(blog)
    setLongForm(false)
  }

  // suicide!!! this should probably be one level up ;)
  const deleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      blogService.deleteItem(blog.id)
      setLongForm(false)
    }
  }

  return (
    <div style={blogStyle}>
      <div className='shortBlog' style={shortWhenLong}>
        {blog.title} {blog.author}
        <button onClick={() => setLongForm(true)}>view</button>
      </div>
      <div className='longBlog' style={longWhenShort}>
        {blog.title} {blog.author}<button onClick={() => setLongForm(false)}>hide</button><br />
        {blog.url}<br />
        {blog.likes} <button onClick={() => addLike(blog)}>like</button><br />
        {blog.user.name}<br />
        <button onClick={() => deleteBlog(blog)}>delete</button><br />
      </div>
    </div>
  )

  // if (blog.longVisibility === true) {
  //   return (
  //     <div style={blogStyle}>
  //       {blog.title} {blog.author}<button onClick={() => toggleFormat(blog)}>hide</button><br />
  //       {blog.url}<br />
  //       {blog.likes} <button onClick={() => console.log('likes plus one')}>like</button><br />
  //       {blog.user.name}
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div style={blogStyle}>
  //       {blog.title} {blog.author}
  //       <button onClick={() => console.log('expanding blog')}>view</button>
  //     </div>
  //   )
  // }
}

export default Blog
