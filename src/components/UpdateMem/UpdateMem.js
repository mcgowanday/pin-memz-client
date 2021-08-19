// Import react & destructuring the Component
import React, { Component } from 'react'
import { Card, Form, Button, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

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
        date: '',
        location: '',
        party: '',
        category: '',
        enjoyed: false,
        starred: false,
        notes: ''
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

  handleCheckBoxChange = (event) => {
    event.persist()
    this.setState((prevState) => {
      const name = event.target.name
      const value = event.target.checked

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
    console.log(this.props)
    console.log(this.props.match.params)
    const { msgAlert } = this.props
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
      .then(() => msgAlert({
        heading: 'Edit Success',
        message: messages.editMemSuccess,
        variant: 'success'
      }))
      // .then(() => history.push(`#/memories/${this.props.match.params.id}`))
      // not working says Cannot read property 'push' of undefined
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Edit Failed with error: ' + error.message,
          message: messages.editMemFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { memory } = this.state
    // If we've update the memory (updated is true)
    // Then we'll redirect somewhere else
    if (this.state.updated) {
      return <Redirect to={'/view-memz'}/>
    }

    return (
      <div>
        <h1 style={{ color: '#1A7565' }}>Edit Mem</h1>
        <Card id="cream" border="secondary">
          <Card.Header as="h3">Update Current Mem!{memory.title}</Card.Header>
          <Card.Body>
            <Card.Title>Update Current Mem!</Card.Title>
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="Title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={this.state.title}
                    placeholder="Enter Mem Title"
                    onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="FormGridDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={this.state.date}
                    placeholder=" "
                    onChange={this.handleChange}/>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="memory.Location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={this.state.location}
                    placeholder="e.g. '1234 Poplar St' , 'The Swimming Hole' , 'Dave's Apartment'"
                    onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group as={Col} controlId="memory.Category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Select..."
                    type="text"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleChange}>
                    <option>Select...</option>
                    <option>Concert</option>
                    <option>Conversation</option>
                    <option>Dinner</option>
                    <option>Drinks</option>
                    <option>Exercise</option>
                    <option>Game</option>
                    <option>Lunch</option>
                    <option>Movie</option>
                    <option>Party</option>
                    <option>Performance</option>
                    <option>Purchase</option>
                    <option>Sporting Event</option>
                    <option>Wedding</option>
                    <option>Work</option>
                    <option>Other</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="memory.Party">
                <Form.Label>Group</Form.Label>
                <Form.Control
                  type="text"
                  name="party"
                  value={this.state.party}
                  placeholder=" e.g. 'Mike, Eron, Beth, Ben, Alex, Timm' "
                  onChange={this.handleChange}/>
                <Form.Text className="text-muted">
          Who you made this memory with!
                </Form.Text>
              </Form.Group>

              <Form.Group id="formGridCheckbox">
                <Form.Check
                  aria-label="option 1"
                  type="checkbox"
                  label="Great Mem"
                  name="starred"
                  checked={memory.starred}
                  onChange={this.handleCheckBoxChange}/>
                <Form.Check
                  aria-label="option 1"
                  type="checkbox"
                  label="Bad Mem"
                  name="enjoyed"
                  checked={memory.enjoyed}
                  onChange={this.handleCheckBoxChange}/>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  name="notes"
                  value={this.state.notes}
                  placeholder=" Enter notes here... "
                  onChange={this.handleChange}/>
              </Form.Group>

              <Button variant="secondary" type="submit">
                Submit and Back to ViewMemz
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default UpdateMem
