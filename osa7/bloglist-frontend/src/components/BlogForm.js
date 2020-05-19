import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import {
  Button,
  TextField,
} from '@material-ui/core'


const BlogForm = ( props ) => {

  const addBlog = async (event) => {
    event.preventDefault()

    // create newBlog
    console.log('in AddBlog with props: ', props)

    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0
    }

    try {
      props.createBlog(newBlog)
      props.closeMe.current.toggleVisibility()
      const message = `a new blog ${newBlog.title} by ${newBlog.author} added`
      const type = 'success'
      props.showNotification({
        message, type
      })
    } catch(exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <TextField label="title" name="title"/>
        </div>
        <div>
          <TextField label="author" name="author"/>
        </div>
        <div>
          <TextField  label="url" name='url' type='url' />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            create blog
          </Button>
        </div>
      </form>
    </div>
  )

  // return (
  //   <form onSubmit={addBlog}>
  //     <div>
  //       title:
  //       <input
  //         name="title"
  //         id="blogTitle"
  //         // value={newBlog.title}
  //         // onChange={handleTitleChange}
  //       />
  //     </div>
  //     <div>
  //       author:
  //       <input
  //         name="author"
  //         id="blogAuthor"
  //         // value={newBlog.author}
  //         // onChange={handleAuthorChange}
  //       />
  //     </div>
  //     <div>
  //       url:
  //       <input
  //         name="url"
  //         id="blogUrl"
  //         // value={newBlog.url}
  //         // onChange={handleUrlChange}
  //       />
  //     </div>
  //     <div>
  //       <button id="createBlog" type="submit">add</button>
  //     </div>
  //   </form>
  // )
}

const mapDispatchToProps = {
  createBlog,
  showNotification,
}

export default connect(
  null,
  mapDispatchToProps
)(BlogForm)
