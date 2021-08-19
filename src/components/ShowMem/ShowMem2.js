// deconstruct the `Component` class of the react library
import React, { Component, Link } from 'react'
// import Card from 'react-bootstrap/Card'
import { Card, Button } from 'react-bootstrap'
// import { Card, Button } from 'react-bootstrap'
import { withRouter, Redirect } from 'react-router-dom'
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

    const { id } = this.props.match.params
    // axios(`${apiUrl}/memories/${this.props.match.params.id}`)
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

    const ShowMemLayout = {
      // display: 'flex',
      // justifyContent: 'center'
      // flexFlow: 'row wrap'
    }
    // const memCards = memory.map(purchase => {
    //   return (
    //     <Card bg="info" key={purchase._id} style={{ width: '14rem', margin: 8 }}>
    //       {/* <Card.Img variant='top' src={purchase.backgroundUrl}/> */}
    //       <Card.Body>
    //         <Card.Title>{purchase.product.name}</Card.Title>
    //         <Card.Text>ID:{purchase._id}</Card.Text>
    //         <Card.Text>{purchase.product.description}</Card.Text>
    //         <Card.Text>${purchase.product.price}</Card.Text>
    //         <Link to={`/purchases/${purchase._id}`} key={purchase._id}>
    //           <Button>View Purchase Details</Button>
    //         </Link>
    //       </Card.Body>
    //     </Card>
    //   )
    // })

    // Loading & Book to Display
    console.log('State in the render: ', memory)
    return (
      <div style={ShowMemLayout}>
        <h1 style={{ color: '#1A7565' }}>Memory:</h1>
        {memory ? (
          <div>
            <Card border="secondary">
              <Card.Header>
                <Card.Title>
                  {memory.title}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>Location: {memory.location} </Card.Subtitle>
                <br></br>
                <Card.Subtitle>Date: {memory.date} </Card.Subtitle>
                <br />
                <Card.Subtitle>Category:  {memory.category} </Card.Subtitle>
                <Card.Subtitle>Category:        {memory.category} </Card.Subtitle>
                <ul></ul>
                <Card.Subtitle>Notes:  {memory.notes} </Card.Subtitle>
              </Card.Body>
            </Card>
            <Button href="#/view-memz/">Delete This Mem</Button> <Button type="submit">Delete This Mem</Button>{' '}
            <Button href="#/view-memz/">Delete This Mem</Button> <Button type="submit">Delete This Mem</Button>{' '}
            <Link to='/view-memz/' onClick={this.destroyMemory}><button>Delete This Mem</button></Link>
            <br/>
            <Link to={`/memories/${this.props.match.params.id}/edit`}><button type="button">Edit This Mem</button></Link>
            <br/>
            <Link to='/view-memz/'><button type="button">Back to ViewMemz</button></Link>
          </div>
        ) : 'Loading...'}
      </div>
    )
  }
}

// Gotta export!
export default withRouter(ShowMem)
