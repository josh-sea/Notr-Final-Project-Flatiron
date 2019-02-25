import React, { Component } from 'react';
import './App.css';
import NoteContainer from './Containers/NoteContainer';
import Classrooms from './Containers/Classrooms';
import { Row, Col } from 'react-materialize';
import LiveNotes from './Containers/LiveNotes';
import Header from './Components/Header'
import Login from './Components/Login'


class App extends Component {
    state = {
      notes: [],
      users: [],
      classrooms: [],
      text: '',
      currentUser: {},
      currentNote: false,
      currentClassroom: {},
      userNotes: [],
      userClassrooms: {},
      activeItem: '',
      noteSize: 9,
      noteStatus: false,
      username: '',
      authenticated: false,
      editView: false,
      newClassroomFormBool: false,
      title: '',
      classroomNames: [],
      selectedClassroom: {},
      newClassRoomName: '',
      activeMenuLogIn: 'Sign In',
    }

//###################################################
//componentDidMount fetches all users, notes, and classrooms
    componentDidMount() {
      fetch('http://localhost:9000/api/v1/users')
      .then(r=>r.json())
      .then(users=>this.setState({users}))

      fetch('http://localhost:9000/api/v1/notes')
      .then(r=>r.json())
      .then(notes=>this.setState({notes}))

      fetch('http://localhost:9000/api/v1/classrooms')
      .then(r=>r.json())
      .then(classrooms=> this.setState({classrooms}))
    }

//###################################################
//handles draging text from modal to simulate close click
      handleDragLeave = (e) => {
        e.target.parentNode.parentNode.querySelector('.btn.waves-effect.waves-light.btn-flat.modal-action.modal-close').click()
      }

//###################################################
//controlling input to text editor
      noteEdit = (value) => {
      this.setState({ text: value })
      }

//###################################################
//controlling click on an individual note button
      handleClick = e => {
        const currentNote = this.state.notes.find(note=>{
          return note.id === parseInt(e.target.dataset.id)
        })
        this.setState({currentNote},()=>{
          const currentClassroom = this.state.classrooms.find(classroom=>{
            return classroom.id === this.state.currentNote.classroom_id
          })
          this.setState({currentClassroom},()=>{
            this.setState({text: this.state.currentNote.content, noteSize: 6, noteStatus: true, editView: true, newClassroomFormBool: false, title: this.state.currentNote.title, selectedClassroom: this.state.currentClassroom})
          })
         // const reload = setInterval(this.reloadTimer, 500);
      })
    }
//###################################################
//interval for live note reload - polling instead of websocket

       reloadTimer = () => {
       fetch('http://localhost:9000/api/v1/users')
       .then(r=>r.json())
       .then(users=>this.setState({users}))

       fetch('http://localhost:9000/api/v1/notes')
       .then(r=>r.json())
       .then(notes=>this.setState({notes}))

       fetch('http://localhost:9000/api/v1/classrooms')
       .then(r=>r.json())
       .then(classrooms=>{
         console.log('interval works');
          this.setState({classrooms})
        })
      }

//###################################################
//handles clicks on the main menu
      handleMenuClick = (e, data) =>{
//##################################################################
//handling new note selection
        e.target.id === 'new-note' && this.setState({newClassroomFormBool: false, title: '', editView: true, noteStatus: false, text: '', currentNote: false, currentClassroom: {}, noteSize: 9, selectedClassroom: false})
//##################################################################
//handling new classroom selection
        e.target.id === 'new-classroom' && this.setState({newClassroomFormBool: true, editView: false, noteStatus: false, text: '', currentNote: false, currentClassroom: {}})
//##################################################################
//handling lgging out
        e.target.id === 'logout' && this.setState({
          text: '',
          currentUser: {},
          currentNote: false,
          currentClassroom: {},
          userNotes: {},
          userClassrooms: {},
          activeItem: '',
          noteSize: 9,
          noteStatus: false,
          username: '',
          authenticated: false,
          editView: false,
          newClassroomFormBool: false,
          title: '',
          classroomNames: [],
          selectedClassroom: {},
          activeMenuLogIn: 'Sign In',
        },()=>{
          localStorage.removeItem('currentUserID', this.state.currentUser.id);
        })
//##################################################################
// handling saving functionality
        if (e.target.id === 'save' && !this.state.currentNote) {
        fetch(`http://localhost:9000/api/v1/notes`, {
        method: "POST",
        headers:
        {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.text,
          user_id: this.state.currentUser.id,
          classroom_id: this.state.selectedClassroom.id
        })
      })
      .then(r=>r.json())
      .then(r=>{
          this.setState(prevState=>{
            return {notes: [...prevState.notes, r], userNotes: [...prevState.userNotes, r], currentNote: r}
          })
        })
      } else {
        e.target.id === 'save' && this.state.currentNote.id>0 &&
        fetch(`http://localhost:9000/api/v1/notes/${this.state.currentNote.id}`, {
        method: "PATCH",
        headers:
        {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.text,
          user_id: this.state.currentUser.id,
          classroom_id: this.state.selectedClassroom.id
        })
      })
      .then(r=>r.json())
      .then(r=>{

        const allNoteIndex =  this.state.notes.indexOf(this.state.currentNote)
        const foundUserNote = this.state.userNotes.find(usernote=>{
          return usernote.id === r.id
        })
        const userNoteIndex = this.state.userNotes.indexOf(foundUserNote)
        const newAllN = [...this.state.notes]
        newAllN.splice(allNoteIndex,1, r)
        const newUserN = [...this.state.userNotes]
        newUserN.splice(userNoteIndex,1, r)
        this.setState(prevState=>{
          return {notes: newAllN, userNotes: newUserN, currentNote: r}
        })
      })
    }
//##################################################################
// handling delete functionality
    e.target.id === 'delete' && this.state.currentNote &&
    fetch(`http://localhost:9000/api/v1/notes/${this.state.currentNote.id}`, {
      method: 'DELETE'
    })
    .then(r=>r.json())
    .then(r=>{
      const allNoteIndex =  this.state.notes.indexOf(this.state.currentNote)
      const userNoteIndex = this.state.userNotes.indexOf(this.state.currentNote)

      const newAllN = [...this.state.notes]
      newAllN.splice(allNoteIndex,1)

      const newUserN = [...this.state.notes]
      newUserN.splice(userNoteIndex,1)
        this.setState({
          notes: newAllN,
          userNotes: newUserN,
          text: '',
          currentNote: false,
          currentClassroom: {},
          activeItem: '',
          noteSize: 9,
          noteStatus: false,
          editView: false,
          newClassroomFormBool: false,
          title: '',
          classroomNames: [],
          selectedClassroom: {},
        })
      })
//##################################################################
// handling new classroom functionality




      }//end of dropdown menu on click
//##################################################
//log in control and page rendering
      handleLoginType = e => {
        this.setState({username: e.target.value})
      }

      handleSubmit = e => {
        if (this.state.activeMenuLogIn==='Sign In'){
        fetch("http://localhost:9000/api/v1/login", {
          method: 'POST',
          headers:
          {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
          },
          body: JSON.stringify({
            username: this.state.username
        })
      })
        .then(r=>r.json())
        .then(r=>{
          this.setState({authenticated: r.success, currentUser: r.user, userClassrooms: r.classrooms, userNotes: r.notes},()=>{
            const classroomNames = this.state.userClassrooms.map(classroom=>{
              return { key: classroom.id, value: classroom.id, text: classroom.name }
            })
            this.setState({classroomNames})
            localStorage.setItem('currentUserID', this.state.currentUser.id);
            // const classroomNames = this.state.classrooms.filter(classroom=>{
            //   return
            })
          })
        } else {

          alert('Register');
        }
      }

      //####################################################
// new classroom form
      newClassroomType = (e, {data}) =>{
        this.setState({newClassRoomName: e.target.value})
      }
// newClassRoomName
      handleNewClassRoom = e =>{
        e.preventDefault()
        fetch('http://localhost:9000/api/v1/classrooms', {
          method: "POST",
          headers:
          {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
          },
          body: JSON.stringify({
            name: this.state.newClassRoomName
          })
        })
        .then(r=>r.json())
        .then(classroom=> {
          const foundClass =  this.state.classrooms.find(aclass=>{
            return aclass.id === classroom.id
          })
          const foundUserClass =  this.state.userClassrooms.find(aclass=>{
            return aclass.id === classroom.id
          })
          if (!foundClass){
          this.setState(prevState=>{
            return {classrooms: [...prevState.classrooms, classroom], userClassrooms: [...prevState.userClassrooms, classroom]}
          },()=>{
            const classroomNames = this.state.userClassrooms.map(classroom=>{
              return { key: classroom.id, value: classroom.id, text: classroom.name }
            })
            this.setState({classroomNames},()=>{
              fetch(`http://localhost:9000/api/v1/notes`, {
              method: "POST",
              headers:
              {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
              },
              body: JSON.stringify({
                title: 'Untitled Note',
                content: '',
                user_id: this.state.currentUser.id,
                classroom_id: classroom.id
              })
            })
            .then(r=>r.json())
            .then(r=>{
                this.setState(prevState=>{
                  return {notes: [...prevState.notes, r], userNotes: [...prevState.userNotes, r], currentNote: r}
                })
              })
            })
          })

        }
        else if (foundClass && !foundUserClass) {
          this.setState(prevState=>{
            return {userClassrooms: [...prevState.userClassrooms, classroom]}
          },()=>{
            const classroomNames = this.state.userClassrooms.map(classroom=>{
              return { key: classroom.id, value: classroom.id, text: classroom.name }
            })
            this.setState({classroomNames},()=>{
              fetch(`http://localhost:9000/api/v1/notes`, {
              method: "POST",
              headers:
              {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
              },
              body: JSON.stringify({
                title: 'Untitled Note',
                content: '',
                user_id: this.state.currentUser.id,
                classroom_id: classroom.id
              })
            })
            .then(r=>r.json())
            .then(r=>{
                this.setState(prevState=>{
                  return {notes: [...prevState.notes, r], userNotes: [...prevState.userNotes, r], currentNote: r}
                })
                alert(`Someone already created ${classroom.name}, it has been added to your classrooms!`)
              })
            })
            })
        } else {
          alert('You already have that classroom in your classrooms!')
        }
      })
    }


//####################################################
//handle new note
        handleTitleChange = e =>{
          this.setState({title: e.target.value})
        }

handleClassSelect = (e, {value})=>{
  const selectedClassroom = this.state.classrooms.find(classroom=>{
    return classroom.id === value
  })
  this.setState({selectedClassroom, noteSize: 6, noteStatus: true, editView: true, currentClassroom: selectedClassroom})
}


  handleSignInMenuTab = (e, { name }) => {
    this.setState({ activeMenuLogIn: name })
  }

//######################################################

    render() {
      return (
        <div>
          {
          !this.state.authenticated &&
            <Row>
              <Login name={this.state.username} handleSignInMenuTab={this.handleSignInMenuTab} activeMenuLogIn={this.state.activeMenuLogIn} handleLoginType={this.handleLoginType} handleSubmit={this.handleSubmit} />
            </Row>
          }
        {
          this.state.authenticated &&
          <Row style={{paddingLeft: '3%', paddingRight: '3%'}}>
            <Row>
              <Header
              currentUserID={this.state.currentUserID}
              handleMenuClick={this.handleMenuClick} />
            </Row>
            <Row>
              <Col s={3} >
                <Classrooms
                click={this.handleClick}
                classrooms={this.state.userClassrooms}
                notes={this.state.userNotes}
                />
              </Col>
              <Col s={this.state.noteSize} >
                <NoteContainer
                selectedClassroom={this.state.selectedClassroom}
                editView={this.state.editView}
                newClassroomFormBool={this.state.newClassroomFormBool}
                newClassroomType={this.newClassroomType}
                newClassRoomName={this.state.newClassRoomName}
                handleNewClassRoom={this.handleNewClassRoom}
                activeItem={this.state.activeItem}
                noteEdit={this.noteEdit}
                text={this.state.text}
                title={this.state.title}
                handleTitleChange={this.handleTitleChange}
                classroomNames={this.state.classroomNames}
                handleClassSelect={this.handleClassSelect}
                />
              </Col>
              {this.state.editView && this.state.noteStatus &&
              <h4 align='center'>{this.state.currentClassroom.name}</h4>}
              {this.state.editView && this.state.noteStatus &&
              <Col s={3} >
                <LiveNotes
                currentClassroom={this.state.currentClassroom}
                users={this.state.users}
                notes={this.state.notes}
                handleDragLeave={this.handleDragLeave}
                />
              </Col>
            }
          </Row>
        </Row>}
      </div>
    );
  }
}

export default App;
