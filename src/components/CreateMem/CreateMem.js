// Import react & destructuring the Component
import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Card, Form, Button, Col } from 'react-bootstrap'

// Http requests
import axios from 'axios'
import apiUrl from './../../apiConfig'

// "Inheriting" from the Component class
class CreateMem extends Component {
  // 2 very important methods: constructor & render
  constructor (props) {
    super(props)

    console.log(this.props)

    // UseFUL constructors set up state
    this.state = {
      memory: {
        title: '',
        date: '',
        location: '',
        party: '',
        category: '',
        enjoyed: true,
        starred: false,
        notes: ''
      },
      created: false
    }
  }

  handleChange = (event) => {
    // console.log(this.state)
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

      const updatedValue = { [name]: value } // => title: 'hil'
      // title: 'hi', author: 'hello', title: 'hil'
      // author: 'hello', title: 'hil'
      return { memory: { ...prevState.memory, ...updatedValue } }
      // return { book: { ...prevState.book, ...{ [name]: value } } }
    })
  }

  // handleToggle () {
  //   this.setState({ checkboxChecked: !this.state.checkboxChecked });
  // }

  // handleCheckBoxChange = (event) => {
  //   // const enjoyed = event.target.name
  //   event.persist()
  //   console.log(event)
  //   console.log(this.state)
  //   // const { enjoyed } = this.state
  //   this.setState((prevState) => {
  //     return {
  //       ...prevState,
  //       enjoyed: !prevState.enjoyed
  //     }
  //   })
  //   console.log(this.state)
  // }

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
    console.log(this.state)
    // We want to prevent a refresh on submit of our form
    event.preventDefault()

    axios({
      method: 'POST',
      url: `${apiUrl}/memories/`,
      headers: {
      // we need the user, so we have access to their token
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { memory: this.state.memory }
    })
      .then(() => {
        this.setState({ created: true })
        console.log(this.state)
        // return <Redirect to="view-memz"/>
      })
      // .then(() => {
      //   return <Redirect to="/view-memz"/>
      // })
      .catch(console.error)
  }

  // const CreateMemLayout = {
  //   // display: 'flex',
  //   // justifyContent: 'center'
  //   // flexFlow: 'row wrap'
  // }

  render () {
    const { memory, created } = this.state

    // If Mem created equals 'true', redirect to view memz page
    if (created) {
      return <Redirect to="view-memz"/>
    }

    return (
      <Card bg="light" border="secondary" style={{ width: '72rem', margin: 8 }}>
        <Card.Header as="h3">Memory Logger</Card.Header>
        <Card.Body>
          <Card.Title>Create New Mem!</Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  value={this.state.title}
                  placeholder="Enter Mem Title"
                  onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group as={Col} controlId="FormGridDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  required
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
                  required
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
                  <option>Work</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="memory.Party">
              <Form.Label>Party</Form.Label>
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
                label="This is a Special Mem"
                name="starred"
                checked={memory.starred}
                onChange={this.handleCheckBoxChange}/>
              <Form.Check
                aria-label="option 1"
                type="checkbox"
                label="This a Bad Mem"
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
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default CreateMem
