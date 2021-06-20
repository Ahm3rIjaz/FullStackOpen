const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response, next) => {
	const body = request.body
	try {
		const saltRounds = 10
		if (!body.password || body.password.length < 3) {
			response.status(400).json({error: 'password should be of atleast 3 charachters'})
		} else {
			const passwordHash = await bcrypt.hash(body.password, saltRounds)
			body['passwordHash'] = passwordHash
			const user = new User(body)
		
			const savedUser = await user.save()
		
			response.json(savedUser)
		}
	} catch (error) {
		console.log(error)
		next(error)
	}
})

usersRouter.get('/', async (request, response, next) => {
	try {
		const users = await User
			.find({}).populate('blogs', {title: 1, author: 1, url: 1})
		response.json(users)
	} catch (error) {
		next(error)
	}
})

usersRouter.delete('/:id', async(request, response) => {
	try {
		await User.findByIdAndRemove(request.params.id)
		response.status(204).end()
	} catch (exception) {
		response.status(204).json({error: 'malformatted id'})
	}
})

module.exports = usersRouter