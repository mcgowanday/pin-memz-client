// deconstruct the `Component` class of the react library
import React, { Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
// HTTP requests we need axios & the url
import axios from 'axios'
import apiUrl from './../../apiConfig'
import { memDelete } from '../../api/memory'

class ShowMem extends Component {
  // 2 very important methods: constructor, render
  constructor (props) {
    super(props)

    // UseFUL constructors have state
    this.state = {
      memory: null,
      deleted: false
    }
    console.log(this.state)
  }

  componentDidMount () {
    console.log(this.props)
    console.log(this.props.match)
    // Show request /books/:id
    // We need to get the ID in the front-end URL
    // I could destructure the params out of the params obj
    // create a variable called `id` to store the value of
    // `this.props.match.params.id`
    // this.props is built-in in class components we always have this.props
    // this.props.match is an object from the `Route` component
    // which provides information about the route URL we matches
    // match.params object contains key/value pairs
    // for an URL params `/books/:id` < :id is the url param
    // it's name is "id" so the params object has a key "id"
    const { id } = this.props.match.params
    // axios(`${apiUrl}/books/${this.props.match.params.id}`)
    axios({
      url: apiUrl + '/memories/' + id,
      method: 'GET',
      // Add an authorization header
      headers: {
      // we need the user, so we have access to their token
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ memory: res.data.memory })
      })
      .catch(console.error)
  }

  destroyMemory = (event) => {
    const { user, match } = this.props
    console.log(this.props)
    // make a delete axios request
    memDelete(match.params.id, user)
    // Make an axios request to delete the book
    // axios.delete(`${apiUrl}/memories/${this.props.match.params.id}`)
    // // axios({
    // //   method: 'Delete',
    // //   url: `${apiUrl}/books/${this.props.match.params.id}`
    // // })
      .then(res => {
        // We want to redirect on success
        // Often going to trigger a state change to then
        // trigger a re-render and change what the page looks like
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    const { memory, deleted } = this.state

    // With a redirect
    // We might decide to return just the redirect by itself
    if (deleted) {
      return <Redirect to="/memories"/>
    }

    // Loading & Book to Display
    console.log('State in the render: ', memory)
    return (
      <div>
        <h1>Memory View</h1>
        {/* {this.state.book && (
          <div>
            <h3>{this.state.book.title}</h3>
            <p>Written by: {this.state.book.author}</p>
          </div>
        )}
        {!this.state.book && 'Loading...'} */}
        {memory ? (
          <div>
            <h3>{memory.title}</h3>
            <p>Date: {memory.date}</p>
            <button onClick={this.destroyMemory}>Toss This Memory</button>
            <br/>
            <Link to={`/memories/${this.props.match.params.id}/edit`}><button type="button">Edit This Mem</button></Link>
            <br/>
            <Link to='/view-memz/'><button type="button">All Memz</button></Link>
          </div>
        ) : 'Loading...'}
      </div>
    )
  }
}

// Gotta export!
export default withRouter(ShowMem)
