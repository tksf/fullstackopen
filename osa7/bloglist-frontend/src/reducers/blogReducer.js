import blogService from '../services/blogs'
import { showNotification } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
  case 'LIKE':
    console.log('liked', action)
    return state.map(b =>
      b.id !== action.data.id ? b : action.data
    )
  case 'COMMENT':
    console.log('commented', action)
    return state.map(b =>
      b.id !== action.data.id ? b : action.data
    )
  case 'INIT_BLOGS':
    console.log('init returning', action)
    return action.data
  case 'ADD':
    console.log('blogs reducer add', action.data)
    return ([...state, action.data])
  case 'DELETE':
    console.log(`blogs reducer delete ${action.data}`)
    return state.filter(b => b.id !== action.data.id)
  default:
    return state
  }

}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch ({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const NewBlog = await blogService.create(content)
    dispatch({
      type: 'ADD',
      data: NewBlog,
    })
  }
}

export const addLike = (content) => {
  return async dispatch => {
    const newBlog = { ...content, likes: content.likes + 1 }
    try {
      await blogService.update(newBlog)
      dispatch({
        type: 'LIKE',
        data: newBlog,
      })
    } catch (exception) {
      const message = `No likey-likes this time ${exception}`
      const type = 'error'
      dispatch(showNotification({
        message, type
      }))
    }
  }
}

export const addComment = (blog, newComment) => {
  // how to get the new comment
  console.log('addComment', blog, newComment)

  return async dispatch => {
    const newBlog = { ...blog, comments: blog.comments.concat({comment: newComment}) }
    // console.log('addComment', newBlog)
    try {
      console.log('trying in addComment', newBlog)
      await blogService.comment(newBlog)
      dispatch({
        type: 'COMMENT',
        data: newBlog,
      })
    } catch (exception) {
      const message = `No likey-likes this time ${exception}`
      const type = 'error'
      dispatch(showNotification({
        message, type
      }))
    }
  }
}

export const deleteBlog = (content) => {
  return async dispatch => {
  // const blogToDelete = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove blog ${content.name} by ${content.author}`)) {
      try {
        await blogService.deleteItem(content.id)
        dispatch({
          type: 'DELETE',
          data: content,
        })
      } catch  (exception) {
        const message = `Delete did not succeed: ${exception}`
        const type = 'error'
        dispatch(showNotification({
          message, type
        }))
      }
    }
  }
}

export default blogReducer
