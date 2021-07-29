const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
let token = ''


beforeEach(async () => {
	await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
    
  token = response.body.token
  const userId = await User.findOne({username: "root"})
	const blogs = helper.initialBlogs.map(blog => new Blog({...blog, 'user': userId._id}))
	const promiseArray = blogs.map(blog => blog.save())
	await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .set('Authorization', `bearer ${token}`)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id is unique identifier of blog posts', async () => {
	const response = await api.get('/api/blogs')
	response.body.forEach((blog) => {
		expect(blog.id).toBeDefined()
	})
	//expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('new blog adds succesfully', async () => {
	const newBlog = {
		"title": "React",
		"author": "Anonymous",
		"url": "https://react.com/",
		"likes": 6,
	}
	await api
		.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	// const response = await api.get('/api/blogs')
	// expect(response.body).toHaveLength((helper.initialBlogs.length) + 1)
})

test('set likes property to zero if missing', async () => {
	const newBlog = {
		title: "React",
		author: "Anonymous",
		url: "https://react.com/",
	}
	const response = await api
		.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

		expect(response.body.likes).toBe(0)
})

test('receive 400 BAD REQUEST as response if title and url missing', async () => {
	const newBlog = {
		author: "Anonymous",
	}
	const response = await api
		.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
		.send(newBlog)
		.expect(400)
})

afterAll(() => {
	mongoose.connection.close()
})