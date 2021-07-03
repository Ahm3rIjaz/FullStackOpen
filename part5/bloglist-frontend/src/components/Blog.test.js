import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blog', () => {
  let component
  const blog = {
    author: 'tester',
    url: 'test.com',
    likes: 0,
    title: 'Testing React apps using jest',
    user: {
      username: 'tester'
    }
  }

  const user = {
    username: 'tester',
    password: 'test'
  }

  let mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} incrementLike={mockHandler} />
    )
  })

  test('displays title but not url and likes', () => {
    expect(component.container).toHaveTextContent(
      'Testing React apps using jest'
    )
    const div = component.container.querySelector('.blogDetails')
    expect(div).toHaveStyle('display: none')
  })
  
  
  test('details are shown upon clicking view button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.blogDetails')
    expect(div).not.toHaveStyle('display: none')
  })
  
  test('clicking like button two times calls event handler twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})