import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe ('<Blog />', () => {
  let component

  beforeEach(() => {

    const blog = {
      title: 'test blog to see what renders',
      author: 'tuomas',
      likes: 1234,
      url: 'http://easyinviter.com',
      user: {
        name: 'kallevh',
        id: 'aaadsgsfafsfds'
      },
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders short for content by default', () => {

    const div = component.container.querySelector('.shortBlog')
    expect(div).toBeVisible()
    expect(div).toHaveTextContent('tuomas')
    expect(div).toHaveTextContent('test blog to see what renders')
    expect(div).not.toHaveTextContent('1234')
    expect(div).not.toHaveTextContent('easyinviter')

    const div2 = component.container.querySelector('.longBlog')
    expect(div2).not.toBeVisible()

  })

  test('url and likes are shown after the button has been pressed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    // component.debug()

    const div = component.container.querySelector('.shortBlog')
    expect(div).not.toBeVisible()

    const div2 = component.container.querySelector('.longBlog')
    expect(div2).toBeVisible()
    expect(div2).toHaveTextContent('tuomas')
    expect(div2).toHaveTextContent('test blog to see what renders')
    expect(div2).toHaveTextContent('1234')
    expect(div2).toHaveTextContent('easyinviter')

  })

  // test('like button clicked twice, the event will be triggered twice', () => {

  //   // beacuse of the design
  //   // const originalLikes = blog.likes

  //   /// query selectorilla haku, ja lopuks uudestaan

  //   // const addLike = jest.fn()
  //   const button = component.getByText('like')
  //   fireEvent.click(button)
  //   fireEvent.click(button)

  //   // expect(addLike.mock.calls).toHaveLength(2)
  //   // component.debug()
  //   // expect(blog.likes).toHaveValue(1236)

  // }) 




})