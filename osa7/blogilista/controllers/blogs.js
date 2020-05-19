const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
  // console.log('getting route /')

  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log("posting :", request.body, request.token)

  if (!body.likes) {
    body.likes = 0
  }

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'body or url missing'
    })
    // const e = new Error()
    // e.name = 'Bad request'
    // throw e
  }

  // console.log("ready to ", request.token)
  if (!request.token) {
    return response.status(401).json({
      error: 'token missing'
    })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // console.log("decoded:", decodedToken.username, decodedToken.id)

  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    likes: body.likes,
    user: decodedToken.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  // console.log("saved blog", user.blogs)

  // response.status(201).json(savedBlog.toJSON())
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {

  // console.log("in delete", request.token)

  if ( !request.token ) {
    return response.status(401).json({
      error: 'no delete allowed without authetication'
    })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // console.log("decoded:", decodedToken.username, decodedToken.id)

  const blog = await Blog.findById(request.params.id)
  if ( !(decodedToken.id === blog.user.toString()) ) {
    //error
    return response.status(401).json({
      error: 'user not the owner, no delete allowed'
    })
  }

  //otherwise ok to proceed
  await Blog.findByIdAndRemove(request.params.id)

  // remove the blog id from user's list of blogs
  const user = await User.findById(decodedToken.id)
  // console.log(request.params.id)

  user.blogs = user.blogs.filter(item => item.toString() !== request.params.id)

  await user.save()

  response.status(204).end()

})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  console.log("commenting :", body, body.comments, request.token)

  // if (!body.comments) {
  //   return response.status(400).json({
  //     error: 'comment missing'
  //   })
  // }

  // const blog = await Blog.findById(request.params.id)

  const blog = {
    comments: body.comments
  }

  const returnedBlog = await Blog.findByIdAndUpdate(body.id, blog, { new: true })
  console.log('Got back: ', returnedBlog)
  response.status(204).end()

  // person.friends.push(friend);
  // person.save(done);



  // const blog = new Blog({
  //   url: body.url,
  //   title: body.title,
  //   author: body.author,
  //   likes: body.likes,
  //   user: decodedToken.id
  // })

  // const savedBlog = await blog.save()
  // user.blogs = user.blogs.concat(savedBlog._id)
  // await user.save()

  // // console.log("saved blog", user.blogs)

  // // response.status(201).json(savedBlog.toJSON())
  // response.json(savedBlog.toJSON())
})




blogsRouter.put('/:id', async (request, response) => {
  // support for likes only
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).end()
})

module.exports = blogsRouter
