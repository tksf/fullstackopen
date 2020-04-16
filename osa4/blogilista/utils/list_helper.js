const _ = require('lodash')

const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    // console.log(sum, item)
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if ( blogs.length === 0 ) {
    return {}
  } else if ( blogs.length === 1 ) {
    return blogs[0]
  } else {
    return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  }
}

const mostBlogs = (blogs) => {
  if ( blogs.length === 0 ) {
    return {}
  } else if ( blogs.length === 1 ) {
    return { 'author': blogs[0].author, 'blogs': 1 }
  } else {

    // group by author
    const grouped = _.reduce(blogs, (result, blog) => {
      (result[blog.author] || (result[blog.author] = [])).push(blog)
      return result
    }, {})

    let theone = { 'author': '', 'blogs': 0 }
    _.forIn(grouped, (value, key) => {
      // console.log(`Author ${key} with ${value.length} blogs`)
      theone = theone.blogs > value.length ? theone : { 'author': key, 'blogs': value.length }
    })

    return theone
  }
}

const mostLikes = (blogs) => {
  if ( blogs.length === 0 ) {
    return {}
  } else if ( blogs.length === 1 ) {
    return { 'author': blogs[0].author, 'likes': blogs[0].likes }
  } else {

    // group by author
    const grouped = _.reduce(blogs, (result, blog) => {
      (result[blog.author] || (result[blog.author] = [])).push(blog)
      return result
    }, {})


    //reduce function to sum likes
    const reducer = (sum, item) => {
      return sum + item.likes
    }

    let theone = { 'author': '', 'likes': 0 }
    _.forIn(grouped, (value, key) => {
      // console.log(`Author ${key} with ${value.length} blogs`)
      // how many likes
      let likes = value.reduce(reducer, 0)
      console.log(`Author ${key} with ${likes} likes`)
      theone = theone.likes > likes ? theone : { 'author': key, 'likes': likes }
    })

    return theone
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
