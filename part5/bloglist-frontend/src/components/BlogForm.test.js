import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('', () => {
  let addBlog = jest.fn()
  let component = render(
    <BlogForm createBlog={addBlog} />
  )

  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(title,{
    target: {value: 'testing the blogform'}
  })

  fireEvent.change(url,{
    target: {value: 'www.testing.com'}
  })

  fireEvent.change(author,{
    target: {value: 'Tester'}
  })

  fireEvent.submit(form)

  console.log(addBlog.mock.calls)
  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing the blogform')
  expect(addBlog.mock.calls[0][0].url).toBe('www.testing.com')
  expect(addBlog.mock.calls[0][0].author).toBe('Tester')
})