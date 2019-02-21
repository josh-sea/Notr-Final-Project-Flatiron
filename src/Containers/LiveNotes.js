import React from 'react';
import NoteCard from '../Components/NoteCard'
import { Card } from 'semantic-ui-react'

const uuidv4 = require('uuid/v4')

const LiveNotes = ({handleOpen, renderModal, users, notes, modalState, modalOpen, handleDragLeave, handleDrag, handleClose}) => {

const renderNotes = notes.map(note=>{
  return   <NoteCard key={uuidv4()} modalState={modalState} renderModal={renderModal} users={users} handleOpen={handleOpen} note={note} handleDragLeave={handleDragLeave} modalOpen={modalOpen} handleClose={handleClose}/>
})//end of note map
  return (
    <Card.Group style={{height: '80vh', overflow: 'scroll'}}>
    {renderNotes}
    </Card.Group>
);
}
// <NoteCard handleOpen={handleOpen} notes={notes} handleDragLeave={handleDragLeave} modalOpen={modalOpen} handleClose={handleClose}/>

export default LiveNotes;
