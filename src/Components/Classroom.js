import React from 'react';
import { CollapsibleItem, Collapsible, Button } from 'react-materialize';
import { Accordion } from 'semantic-ui-react'



const Classroom = ({notes, classroom, click}) => {

  return (
  <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
)
}
export default Classroom;


// <CollapsibleItem header={`Note:${note.id}`} icon='notes'>
//   <p>{note.content}</p>
//   <Button waves='light' onClick={click}>Edit</Button>
// </CollapsibleItem>


//
// const AccordionExampleNested = () =>
//
// export default AccordionExampleNested



// const level1Panels = notes.map(note=>{
//   const foundClassRoom = classrooms.find(classroom=>{
//     return classroom.id === note.classroom_id
//   })
//   return {key: note.id, title: foundClassRoom, content: `${note.content.slice(0,15)}...`}
// })
//
// const rootPanels = [
//   { key: 'panel-1', title: 'Bio 101', content: { content: Level1Content } },
// ]
//
// const subMenu = (
//   <div>
//       Welcome to level 1
//       <Accordion.Accordion panels={level1Panels} />
//     </div>
// )
