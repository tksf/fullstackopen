import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, addComment } from '../reducers/blogReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import {
  Link, useParams
} from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TextField,
} from '@material-ui/core'

// const blogStyle = {
//   paddingTop: 10,
//   paddingLeft: 2,
//   border: 'solid',
//   borderWidth: 1,
//   marginBottom: 5
// }

const Blogs = () => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[])

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>create new</h2>
      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm closeMe={blogFormRef}/>
        </Togglable>
      </div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  <Blog
                    blog={blog}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


const Blog = ({ blog }) => {
  // const [ longForm, setLongForm ] = useState(false)

  // const dispatch = useDispatch()
  // console.log(blog)
  // const shortWhenLong = { display: longForm ? 'none' : '' }
  // const longWhenShort = { display: longForm ? '' : 'none' }

  return (
    <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  )
}

export const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id

  const blog = useSelector(state => state.blogs.find((b) => b.id === String(id)))
  console.log('Showing blog: ', id, blog)

  const commentBlog = (event) => {
    event.preventDefault()

    console.log('adding comments', blog, event.target.comment.value)
    // addComment(blog, event.target.comment.value)
    dispatch(addComment(blog, event.target.comment.value))
    event.target.comment.value = ''
  }

  if (!blog) {
    return null
  }
  return (
    <div>
    <h3>{blog.title} by {blog.author}</h3>
      <p><a href={blog.url}>{blog.url}</a></p>
      <Button size="small" id="likeBlog" variant="contained" color="primary" onClick={() => dispatch(addLike(blog))}>
        like
      </Button><br />
      {blog.likes} likes <br />
      Added by {blog.user.name}
    <h2> Comments </h2>
      <ul>
      {blog.comments.map(c =>
        <li>{c.comment}</li>
      )}
      </ul>
      <form onSubmit={commentBlog}>
        <TextField
          name="comment"
          id="commentBox"
        />
        <Button size="small" id="createComment" variant="contained" color="primary" type="submit">
          comment
        </Button>
      </form>
    </div>
  )
}


export default Blogs
