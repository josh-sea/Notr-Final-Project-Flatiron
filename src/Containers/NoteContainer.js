import React from 'react';
import ShowNote from '../Components/ShowNote'
import NewClassroomForm from '../Components/NewClassRoomForm'


const NoteContainer = ({ noteEdit, activeItem, text, newClassroomType, newClassRoomName, handleNewClassRoom, newClassroomFormBool, editView, title, handleTitleChange, classroomNames, handleClassSelect, selectedClassroom,}) => (
    <div>
      {!editView && newClassroomFormBool && <NewClassroomForm newClassroomType={newClassroomType} newClassRoomName={newClassRoomName} handleNewClassRoom={handleNewClassRoom} />}
      {editView && !newClassroomFormBool && <ShowNote selectedClassroom={selectedClassroom} handleClassSelect={handleClassSelect} classroomNames={classroomNames} handleTitleChange={handleTitleChange} noteEdit={noteEdit} title={title} text={text}/>}
    </div>
);

export default NoteContainer;
