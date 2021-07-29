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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    //const user = request.user
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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
		//const user = request.user
		if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'only the creator can delete blogs' })
    }
  
    await blog.remove()
    user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
    await user.save()
		response.status(204).end()
	} catch (error) {
		next(error)
	}
})

blogsRouter.put('/:id', async(request, response, next) => {
	try {
		const blog = {
			likes: request.body.likes
		}
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
		response.json(updatedBlog)
	} catch (exception) {
		next(error)
	}
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const comment = request.body.comment
    if (!comment || comment === '') {
      return response.status(401).json({ error: 'no comment field given' })
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { ["$addToSet"]: { comments: comment } }, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter