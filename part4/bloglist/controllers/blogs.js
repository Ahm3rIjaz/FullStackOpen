const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async(request, response, next) => {
	try {		
		const blogs = await Blog
			.find({}).populate('user', { username: 1, name: 1 })
		response.json(blogs)
	} catch (exception) {
		response.status(400).end()
	}
})
  
blogsRouter.post('/', async(request, response, next) => {
	try {
		const body = request.body
    const user = request.user
		body["user"] = user._id
		const blog = new Blog(body)
		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
		response.status(201).json(savedBlog)
	} catch (error) {
		next(error)
	}
})

blogsRouter.delete('/:id', async(request, response, next) => {
	try {
		const blog = await Blog.findById(request.params.id)
		const user = request.user
		if (blog.user.toString() === user._id.toString()) {
			await Blog.findByIdAndRemove(blog.id)
		}
		response.status(204).end()
	} catch (error) {
		next(error)
	}
})

blogsRouter.put('/:id', async(request, response) => {
	try {
		const blog = {
			likes: request.body.likes
		}
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
		response.json(updatedBlog)
	} catch (exception) {
		
	}
})

module.exports = blogsRouter