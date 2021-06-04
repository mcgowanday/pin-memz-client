// Bring in react & "destructuring" the Component
// class from the react Library
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
// bring in the axios library from the package
import axios from 'axios'
// Bring in the 'apiUrl' value
import apiUrl from './../../apiConfig'

// IndexBooks component class
class ViewMemz extends Component {
  // 2 100% required methods: render, constructor
  // constructor function will set up our state:
  constructor (props) {
    // Super function is oftern required, allows us to override
    // things set up in the 'Component' class
    super(props)

    // UseFUL constructors have state
    // this.state is already pre-defined by React
    // But we'll set up initial state values here
    // Eventually the state will hold an array of the books
    // returned from the API request
    this.state = {
      // Possible starting values:
      // - an empty array (when its empty, we might still be loading,
      // when its not empty we display the books)
      // What about if the API has an empty db of books (no books)
      // Explicit nothing = null
      // Handling 3 states of our IndexBooks page
      // 1. Loading in data still (the request is still happening)
      // 2. We've finished loading the data, and it's empty
      // 3. We've finished loading, we have books to display
      memories: null
    }
  }

  componentDidMount () {
    // This function runs at the end of the Mounting stage
    // Here we will make any HTTP requests
    // The response will NOT look the same as other tools like
    // $.ajax, so always print the response first
    axios({
      url: apiUrl + '/memories',
      method: 'GET',
      // Add an authorization header
      headers: {
      // we need the user, so we have access to their token
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        // res is the response object
        // which has a `data` key with our `books`
        // Modify the state to hold the book data
        this.setState({ memories: res.data.memories })
      })
      .catch(console.error)
  }

  // render method run every time the state is modified
  // includes the component "mounts"
  // render is a lifecycle method
  render () {
    // Define temporary variable to hold JSX
    let memoryJsx = ''
    // Loading state
    // if we don't have any books (if books is null/undefined/0)
    if (this.state.memories === null) {
      memoryJsx = (
        <p>Loading...</p>
      )
    } else if (this.state.memories.length === 0) {
      // "No books" state
      memoryJsx = (
        <p>No Memz to display! Get out there!</p>
      )
    } else {
      // Here's your books state
      // have to use .map because you need it to return something
      memoryJsx = (
        <ul>
          {this.state.memories.map(memory => (
            <li key={memory._id}>
              <Link to={`/memories/${memory._id}`}>{memory.title}</Link>
            </li>
          ))}
        </ul>
      )
    }
    console.log('State in the render is: ', this.state)
    return (
      <Fragment>
        <h1>Index Memz Page</h1>
        {memoryJsx}
      </Fragment>
    )
  }
}

// NEVER FORGET
export default ViewMemz
