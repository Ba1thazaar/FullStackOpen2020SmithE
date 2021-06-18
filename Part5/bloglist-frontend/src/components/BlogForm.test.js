import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm inputs match', () => {

  const mockCreateBlog = jest.fn()

  const component = render(
    <BlogForm createBlog = {mockCreateBlog}/>
  )

  const author = component.container.querySelector('#Author')
  const url = component.container.querySelector('#Url')
  const title = component.container.querySelector('#Title')

  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: {value: 'Edward Teach'}
  })
  fireEvent.change(url, {
    target: {value: 'https://www.youtube.com/watch?v=vrGf4nJWVOU&t=1s'}
  })
  fireEvent.change(title, {
    target: {value: 'The Tragic Tale of Stede Bonnet'}
  })

  fireEvent.submit(form)

  expect(mockCreateBlog.mock.calls[0][0].author).toBe('Edward Teach')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('https://www.youtube.com/watch?v=vrGf4nJWVOU&t=1s')
  expect(mockCreateBlog.mock.calls[0][0].title).toBe('The Tragic Tale of Stede Bonnet')
})
