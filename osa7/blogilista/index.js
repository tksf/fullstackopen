const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

// const blogSchema = mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number
// })


// MONGODB_URI=mongodb+srv://fullstack:minaitse@cluster0-7dsyx.mongodb.net/blogilista?retryWrites=true
// const url = process.env.MONGODB_URI


// const mongoUrl = 'mongodb+srv://fullstack:minaitse@cluster0-7dsyx.mongodb.net/blogilista?retryWrites=true'
// // const mongoUrl = 'mongodb://localhost/bloglist'
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})

// const PORT = 3003
