// Import react & destructuring the Component
import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'

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
        location: '',
        date: ''
        // enjoyed: ''
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
    const { created } = this.state

    // If Mem created equals 'true', redirect to view memz page
    if (created) {
      return <Redirect to="view-memz"/>
    }

    return (
      // <div>
      //   <h1>Memory Logger</h1>
      //   // <form onSubmit={this.handleSubmit}>
      //   //   <input
      //   //     name="title"
      //   //     placeholder="Enter Mem Title"
      //   //     value={this.state.memory.title}
      //   //     onChange={this.handleChange}
      //   //   />
      //   //   <input
      //   //     name="location"
      //   //     value={this.state.memory.location}
      //   //     onChange={this.handleChange}
      //   //   />
      //   //   <input
      //   //     name="date"
      //   //     value={this.state.memory.date}
      //   //     onChange={this.handleChange}
      //   //   />
      //   //   <button type="submit">Submit</button>
      //   // </form>
      //   // <br/>
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Enter Mem Title"
              onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group as={Col} controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              required
              type="text"
              name="date"
              value={this.state.date}
              placeholder="e.g. '1234 Poplar St' or 'The Zemskys House'"
              onChange={this.handleChange}/>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="memory.Location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            required
            type="text"
            name="location"
            value={this.state.location}
            placeholder="e.g. '1234 Poplar St' or 'The Zemskys House'"
            onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="formGridParty">
          <Form.Label>Party</Form.Label>
          <Form.Control placeholder=" e.g. 'Mike, Eron, Beth, Ben, Alex, Timm' " />
          <Form.Text className="text-muted">
    Who you made this memory with!
          </Form.Text>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      // </div>
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
