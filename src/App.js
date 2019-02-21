import React, { Component } from 'react';
import './App.css';
import NoteContainer from './Containers/NoteContainer';
import Classrooms from './Containers/Classrooms';
import { Row, Col } from 'react-materialize';
import LiveNotes from './Containers/LiveNotes';
import Header from './Components/Header'


class App extends Component {
  state = {
    text: '',
    notes: [],
    users: [],
    classrooms: [],
    currentUserID: 1,
    modalOpen: false,
    activeItem: '',
  }

  componentDidMount() {
    fetch('http://localhost:9000/api/v1/users')
    .then(r=>r.json())
    .then(users=> {
      this.setState({users})
      this.setState({notes: users[0].notes},()=>{
        this.setState({classrooms: this.state.users[this.state.currentUserID-1].classrooms})
      })
    })
  }

    handleItemClick = (e, { name }) =>{
    alert('saving your changes')
    this.setState({ activeItem: name })
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleDragLeave = (e) => {
      e.target.parentNode.parentNode.querySelector('.btn.waves-effect.waves-light.btn-flat.modal-action.modal-close').click()
    }

  noteEdit = (value) => {
  this.setState({ text: value })
  }

  handleClick = e => {
    this.setState({text: e.target.innerText})
  }

  handleMenuClick = (e) =>{
    if (e.target.id === 'save'){
      fetch(`http://localhost:9000/api/v1/notes/id`)
    }
  }


  render() {
    return (
      <Row style={{paddingLeft: '3%', paddingRight: '3%'}}>
        <Row>
        <Header currentUserID={this.state.currentUserID} handleMenuClick={this.handleMenuClick} />
        </Row>
        <Row>
          <Col s={2} >
            <Classrooms
            click={this.handleClick}
            classrooms={this.state.classrooms}
            notes={this.state.notes}
            />
          </Col>
          <Col s={7} >
            <NoteContainer
            handleItemClick={this.handleItemClick}
            activeItem={this.state.activeItem}
            noteEdit={this.noteEdit}
            text={this.state.text}
            />
          </Col>
          <Col s={3} >
            <LiveNotes
            users={this.state.users}
            notes={this.state.notes}
            handleDragLeave={this.handleDragLeave}
            handleDrag={this.handleDrag}
            handleOpen={this.handleOpen}
            modalOpen={this.state.modalOpen}
            handleClose={this.handleClose}
            />
          </Col>
        </Row>
      </Row>

    )
  }
}


export default App;
