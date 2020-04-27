import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [ newBlog, setNewBlog ] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0
  })

  const handleTitleChange = (event) => {
    // console.log(event.target.value)
    setNewBlog({ ...newBlog, title: event.target.value })
  }
  const handleAuthorChange = (event) => {
    // console.log(event.target.value)
    setNewBlog({ ...newBlog, author: event.target.value })
  }
  const handleUrlChange = (event) => {
    // console.log(event.target.value)
    setNewBlog({ ...newBlog, url: event.target.value })
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog(newBlog)
    setNewBlog({
      title: '',
      author:'',
      url:'',
      likes: 0
    })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id="blogTitle"
          value={newBlog.title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          id="blogAuthor"
          value={newBlog.author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          id="blogUrl"
          value={newBlog.url}
          onChange={handleUrlChange}
        />
      </div>
      <div>
        <button id="createBlog" type="submit">add</button>
      </div>
    </form>
  )
}

export default BlogForm