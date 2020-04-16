const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const helper = require('./test_helper')

const bcrypt = require('bcrypt')
const User = require('../models/user')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'User'
  }
})

// const blogSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number
// })

let initialBlogs = []
let token = ''

beforeEach(async () => {


  // Ei mee ihan oikein....... mut niin kauan hiottu, et talla mennaan nyt

  initialBlogs = [
	  {
	  	'title': 'React patterns',
	  	'author': 'Michael Chan',
	  	'url': 'https://reactpatterns.com/',
	  	'likes': 7,
	  	'user': '',
	  },
	  {
	  	'title': 'Go To Statement Considered Harmful',
	  	'author': 'Edsger W. Dijkstra',
	  	'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
	  	'likes': 5,
	  	'user': '',
	  },
  ]


  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
  const usersAtEnd = await helper.usersInDb()

  console.log('users after creating one: ', usersAtEnd)

  const result = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
    .expect(200)

  // console.log("result from signing in: ", result.body.token)

  token = `Bearer ${result.body.token}`
  console.log(token)

  // now we have a user and token for him


  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  blogObject.user = usersAtEnd.id

  await blogObject.save()
  // const response = await blogObject.save()
  // console.log("in before..... first add:", response)

  blogObject = new Blog(initialBlogs[1])
  blogObject.user = usersAtEnd.id
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/')

  expect(response.body).toHaveLength(initialBlogs.length)
  // console.log("after all blogs came back", response)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/')

  const titles = response.body.map(r => r.title)

  expect(response.body[0].title).toBe('React patterns')
})

test('blogs have id defined', async () => {
  const response = await api.get('/')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
	  'title': 'Canonical string reduction',
	  'author': 'Edsger W. Dijkstra',
	  'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
	  'likes': 12
  }

  console.log('creating a valid blog with: ', token)

  await api
	  .post('/')
	  .set('Authorization', token)
	  .send(newBlog)
	  .expect(200)
	  .expect('Content-Type', /application\/json/)

  // get blogs and see that one was added
  const blogsAtEnd = await api.get('/')
  console.log(blogsAtEnd.body)

  expect(blogsAtEnd.body).toHaveLength(initialBlogs.length + 1)
  expect(blogsAtEnd.body[2].title).toBe(newBlog.title)
})

test('a wihtout correct authentication can not be added', async () => {
  const newBlog = {
	  'title': 'Canonical string reduction',
	  'author': 'Edsger W. Dijkstra',
	  'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
	  'likes': 12
  }

  token = token.substring(0, token.length - 2)

  await api
	  .post('/')
	  .set('Authorization', token)
	  .send(newBlog)
	  .expect(401)
	  // .expect('Content-Type', /application\/json/)

  // // get blogs and see that one was added
  // const blogsAtEnd = await api.get('/')
  // console.log(blogsAtEnd.body)

  // expect(blogsAtEnd.body).toHaveLength(initialBlogs.length + 1)
  //  expect(blogsAtEnd.body[2].title).toBe(newBlog.title)
})


test('likes for blog set to zero if not given', async () => {
  const newBlog = {
	  'title': 'Canonical string reduction',
	  'author': 'Edsger W. Dijkstra',
	  'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  }

  await api
	  .post('/')
	  .set('Authorization', token)
	  .send(newBlog)
	  .expect(200)
	  .expect('Content-Type', /application\/json/)

  // get blogs and see that one was added
  const blogsAtEnd = await api.get('/')
  // console.log(blogsAtEnd.body)
  // expect(blogsAtEnd.body).toHaveLength(initialBlogs.length + 1)
  expect(blogsAtEnd.body[2].likes).toBe(0)
})

test('blog without title nor url can not be added', async () => {
  const newBlog = {
	  'title': '',
	  'author': 'Edsger W. Dijkstra',
	  'url': '',
	  'likes': 12
  }

  await api
	  .post('/')
	  .set('Authorization', token)
	  .send(newBlog)
	  .expect(400)
	  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/')
  // console.log(blogsAtEnd.body)
  // console.log(initialBlogs.length)
	  expect(blogsAtEnd.body).toHaveLength(initialBlogs.length)
})



// test('delete blog post', async () => {
// 	const response = await api.get('/')
// 	const deleteUrl = response.body[0].id

// 	console.log("deleting :", token, deleteUrl)

// 	await api
// 		.delete(`/${deleteUrl}`)
// 		.set('Authorization', token)
// 		.send()
// 		.expect(204)
// })

test('update likes in a blog', async () => {
  const response = await api.get('/')

  const updateUrl = response.body[0].id
  const oldLikes = response.body[0].likes
  const newLikes = oldLikes + 1

  // console.log('putting', updateUrl, newLikes)

  await api
    .put(`/${updateUrl}`)
    .send({ 'likes': newLikes })
    .expect(204)


  // get and verify
  const newBlogs = await api.get('/')
    .expect(200)

  expect(newBlogs.body[0].likes).toBe(newLikes)
})


describe('when there is initially one user at db', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('test fails with too short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password too short')
  })

  test('test fails with too short password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Matti Luukkainen',
      name: 'Matti Luukkainen',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password too short')
  })
})


afterAll(() => {
  mongoose.connection.close()
})

