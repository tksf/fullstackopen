const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const commentSchema = new mongoose.Schema({ comment: String })

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'User'
  },
  comments: [commentSchema]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
