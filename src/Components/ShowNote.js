import React from 'react';
import ReactQuill from 'react-quill';

const ShowNote = ({text, noteEdit}) => (
    <ReactQuill theme='snow' value={text} onChange={noteEdit} style={{height: '70vh'}}/>
    );

export default ShowNote;
