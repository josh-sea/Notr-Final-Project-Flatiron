import React from 'react';
import { Form } from 'semantic-ui-react'

const NewClassroomForm = ({newClassroomType, newClassRoomName, handleNewClassRoom}) => (


  <Form onSubmit={handleNewClassRoom}>
    <Form.Group>
      <Form.Input placeholder='Name' name='name' value={newClassRoomName} onChange={newClassroomType} />
      <Form.Button content='Submit' />
    </Form.Group>
  </Form>

);

export default NewClassroomForm;
