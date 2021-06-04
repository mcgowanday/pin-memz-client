// Import react & destructuring the Component
import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'

// Http requests
import axios from 'axios'
import apiUrl from './../../apiConfig'

// "Inheriting" from the Component class
class CreateMem extends Component {
  // 2 very important methods: constructor & render
  constructor () {
    super()

    // UseFUL constructors set up state
    this.state = {
      memory: {
        title: '',
        date: '',
        location: ''
      },
      created: false
    }
  }

  // "memory": {
  //     "title": "'"${TITLE}"'",
  //     "date": "'"${DATE}"'",
  //     "location": "'"${LOCATION}"'",
  //     "category": "'"${CATEGORY}"'",
  //     "party": "'"${PARTY}"'",
  //     "enjoyed": "'"${ENJOYED}"'",
  //     "starred": "'"${STARRED}"'",
  //     "notes": "'"${NOTES}"'",
  //     "owner": "'"${OWNER}"'"
  //   }

  handleChange = (event) => {
    // This is a synthetic event
    // Synthetic events will get the target and other values
    // "nullified" in a callback
    // event.persist will stop the synthetic event properties
    // from being set to null
    event.persist()
    // The user is typing! Let's update hte state
    // with what they just typed
    this.setState((prevState) => {
      const name = event.target.name
      const value = event.target.value
      // The spread operator! It spreads stuff
      // Spreads data out of data structures
      // ...[1, 2, 3] => 1, 2, 3
      // ...{ title: 'hi', author: 'hello' } => title: 'hi', author: 'hello'
      const updatedValue = { [name]: value } // => title: 'hil'
      // title: 'hi', author: 'hello', title: 'hil'
      // author: 'hello', title: 'hil'
      return { memory: { ...prevState.memory, ...updatedValue } }
      // return { book: { ...prevState.book, ...{ [name]: value } } }
    })
  }

  handleSubmit = (event) => {
    // We want to prevent a refresh on submit of our form
    event.preventDefault()

    axios({
      method: 'POST',
      url: `${apiUrl}/memories/`,
      data: { memory: this.state.memory }
    })
      .then(() => {
        this.setState({ created: true })
      })
      .catch(console.error)
  }

  render () {
    return (
      <div>
        <h1>Memory Logger</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            name="title"
            value={this.state.memory.title}
            onChange={this.handleChange}
          />
          <input
            name="date"
            value={this.state.memory.date}
            onChange={this.handleChange}
          />
          <input
            name="location"
            value={this.state.memory.location}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

// "memory": {
//     "title": "'"${TITLE}"'",
//     "date": "'"${DATE}"'",
//     "location": "'"${LOCATION}"'",
//     "category": "'"${CATEGORY}"'",
//     "party": "'"${PARTY}"'",
//     "enjoyed": "'"${ENJOYED}"'",
//     "starred": "'"${STARRED}"'",
//     "notes": "'"${NOTES}"'",
//     "owner": "'"${OWNER}"'"
//   }

export default CreateMem
