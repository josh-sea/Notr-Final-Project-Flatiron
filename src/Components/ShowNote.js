import React from 'react';
import ReactQuill from 'react-quill';
// import lifecycle from 'react-pure-lifecycle';
import { Animated } from "react-animated-css";
import { Input, Dropdown } from 'semantic-ui-react'
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
      <label>Searchable drowdown</label> <br/>
      <Dropdown style={{margin:'5%'}} placeholder='Select Classroom' scrolling search options={classroomNames} onChange={handleClassSelect} value={selectedClassroom.id}/><br/>
      <Input placeholder='Note Title...' value={title} onChange={handleTitleChange}/>
      <ReactQuill id='quill' theme='snow' value={text} onChange={noteEdit} style={{height: '70vh'}}/>
    </Animated>
    );
}

// export default lifecycle(methods)(ShowNote);
export default ShowNote;
