import React from 'react';
import ReactQuill from 'react-quill';
// import lifecycle from 'react-pure-lifecycle';
import { Animated } from "react-animated-css";
import { Segment, Form } from 'semantic-ui-react'

//
// const methods = {
//   componentDidMount(props) {
//   console.log('I mounted! Here are my props: ', props);
//
// }
// };

const ShowNote = ({text, noteEdit, title, classroomNames, handleTitleChange, handleClassSelect, selectedClassroom}) => {

  return (

    <Animated animationIn="fadeIn" animationOut="flipOutY" isVisible={true}>
      <Segment inverted>
        <Form.Group>
          <Form.Dropdown placeholder='Select Classroom' label='Searchable Dropdown' scrolling search fluid options={classroomNames} onChange={handleClassSelect} value={selectedClassroom.id}/><br/>
          <Form.Input placeholder='Note Title...' value={title} onChange={handleTitleChange}/>
        </Form.Group>
      </Segment>

      <ReactQuill id='quill' theme='snow' value={text} onChange={noteEdit} style={{height: '80vh'}}/>
    </Animated>
    );
}

// export default lifecycle(methods)(ShowNote);
export default ShowNote;
