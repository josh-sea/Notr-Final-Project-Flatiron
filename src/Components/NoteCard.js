import React from 'react';
import {  Card, Image } from 'semantic-ui-react'
// import ModalGen from './ModalGen'
import { Modal, Button } from 'react-materialize'


const NoteCard = ({handleDragLeave, currentClassroom, note, users}) => {

const foundUser = users.find(user=>{
  return user.id === note.user_id
})

const handleTags = () => {
  if (note.content.match(/<.*?>/i)){
    return note.content.replace(/<.*?>/gi, ' ')
  }
}

return (

  <Card>
     <Card.Content>
       <Image className="circular" floated='right' size='mini' src='https://images.unsplash.com/photo-1494022299300-899b96e49893?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' />
       <Card.Header>{note.title}</Card.Header>
       <Card.Meta>{foundUser.username}</Card.Meta>
       <Card.Description>
        {note.updated_at}
       </Card.Description>
     </Card.Content>
     <Card.Content extra style={{display: 'flex', justifyContent: 'center'}}>
     <Modal
     header='Modal Header'
     fixedFooter
     trigger={<Button className='green'>View Note</Button>}>
     <p onDragLeave={handleDragLeave} >{handleTags()}</p>
     </Modal>
     </Card.Content>
   </Card>
   );
 }


export default NoteCard;
