import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders default content', () => {
  const blog = {
    author: 'Edward Teach',
    title: 'The tragic tale of Stede Bonnet',
    url: 'https://www.youtube.com/watch?v=vrGf4nJWVOU&t=1s',
    id: 'ibna;oi89adyf12u9b2'
  }



  const component = render(
    <Blog blog={blog} />
  )

  const author = component.getByText(
    'Edward Teach'
  )
  const title = component.getByText(
    'The tragic tale of Stede Bonnet'
  )

  expect(component.container).not.toHaveTextContent(
    'https://www.youtube.com/watch?v=vrGf4nJWVOU&t=1s'
  )

})

test('renders expanded content', () => {
  const blog = {
    author: 'Edward Teach',
    title: 'The tragic tale of Stede Bonnet',
    url: 'https://www.youtube.com/watch?v=vrGf4nJWVOU&t=1s',
    likes: 1,
    user: {
      username: 'jimothy'
    },
    id: 'ibna;oi89adyf12u9b2'
  }

  const user = {
    username: 'jimothy'
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user = {user} toggleDisplay = {mockHandler}/>
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  const likes = component.getByText(
    'Likes: 1'
  )
  const url = component.getByText(
    'Url: https://www.youtube.com/watch?v=vrGf4nJWVOU&t=1s'
  )
})

test('like button called twice', () => {
  const blog = {
    author: 'Edward Teach',
    title: 'The tragic tale of Stede Bonnet',
    url: 'https://www.youtube.com/watch?v=vrGf4nJWVOU&t=1s',
    likes: 1,
    user: {
      username: 'jimothy'
    },
    id: 'ibna;oi89adyf12u9b2'
  }

  const user = {
    username: 'jimothy'
  }
  const mockView = jest.fn()
  const mockLike = jest.fn()

  const component = render(
    <Blog blog={blog} user = {user} toggleDisplay = {mockView} handleLike = {mockLike}/>
  )

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockLike.mock.calls).toHaveLength(2)
})
