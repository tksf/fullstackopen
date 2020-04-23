import React from 'react'
import Blog from './Blog'

const BlogList = ( props ) => {
  const blogs = props.blogs
  console.log(blogs)

  // const [ listTouched, setlistTouched ] = useState(false)

  // const noteFormRef = React.createRef()

  blogs.forEach(b => {
    b.longVisibility = false
    // console.log('set one to false')
  })

  return (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


//   {blogs.map(blog =>
//     <Blog key={blog.id} blog={blog} />
// )}

export default BlogList