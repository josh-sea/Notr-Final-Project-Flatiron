import React from 'react';
import ShowNote from '../Components/ShowNote'

const NoteContainer = ({noteEdit, activeItem, handleItemClick, text}) => (
  
    <div>
      <ShowNote noteEdit={noteEdit} text={text}/>
    </div>
);

export default NoteContainer;
