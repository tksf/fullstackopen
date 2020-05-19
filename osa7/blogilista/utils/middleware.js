const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  // tokenin ekstraktoiva koodi
  const authorization = request.get('authorization')

  if (authorization) {
  	if (authorization.toLowerCase().startsWith('bearer ')) {
	  	request.token = authorization.substring(7)
  	} else {
  		response.status(401).send({ error: 'non supported authorization method' }).end()
  	}
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  // logger.error("error handler:", error.name)
  // console.log("tama", error.number)
  // console.log(error.message)
  // console.log(error.kind)
  // console.log(typeof(error))

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({
    	error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
    	error: error.message
    })
  } else if (error.name === 'Bad request') {
  	return response.status(400).json({
  		error: 'Bad request'
  	})
  } else if (error.name === 'JsonWebTokenError') {
  	return response.status(401).json({
  		error: 'invalid token'
  	})
  }

  logger.error(error.message)

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}
