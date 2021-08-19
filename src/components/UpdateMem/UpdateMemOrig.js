// Import react & destructuring the Component
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// Http requests
import axios from 'axios'
import apiUrl from './../../apiConfig'

// "Inheriting" from the Component class
class UpdateMem extends Component {
  // 2 very important methods: constructor & render
  constructor (props) {
    super(props)

    // UseFUL constructors set up state
    this.state = {
      memory: {
        title: '',
        location: '',
        date: ''
      },
      updated: false
    }
  }

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
      // return { memory: { ...prevState.memory, ...{ [name]: value } } }
    })
  }

  handleSubmit = (event) => {
    // We want to prevent a refresh on submit of our form
    event.preventDefault()
    console.log(this.props)
    console.log(this.props.match.params)
    axios({
      method: 'PATCH',
      url: `${apiUrl}/memories/${this.props.match.params.id}`,
      headers: {
      // we need the user, so we have access to their token
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { memory: this.state.memory }
    })
      .then(() => {
        this.setState({ updated: true })
      })
      .catch(console.error)
  }

  render () {
    // If we've update the memory (updated is true)
    // Then we'll redirect somewhere else
    if (this.state.updated) {
      return <Redirect to={`/memories/${this.props.match.params.id}`}/>
    }

    return (
      <div>
        <h1>Edit this Mem</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            name="title"
            value={this.state.memory.title}
            onChange={this.handleChange}
          />
          <input
            name="location"
            value={this.state.memory.location}
            onChange={this.handleChange}
          />
          <input
            name="date"
            value={this.state.memory.date}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default UpdateMem
