import React, { useState} from 'react';
import { Input, Space, Empty, Row, Col } from 'antd';
import styled from 'styled-components';
import SearchSelect from '../SearchSelect';
import getNotes from '../../../../utils/getNotes';
import Modal from '../../../../components/Modal';
import getPerfumesByName from '../../../../utils/getPerfumesByName';



//函数组件
function NotesBar(props) {
  const axios = require('axios');
  const { Search } = Input; 
  const { onClose, currentValue ,allNotes} = props;
  const [includingValue, setIncludingValue] = React.useState(currentValue);//可以显示current note可以在显示框中，但是后面会出错。。
  // const Lnote=[];

async function fetchNoteList(noteName){
  console.log('fetching user', noteName);
  return getNotes(noteName)
    .then((response) =>{
      // console.log(response,"response");//搜索框里的note的res
      return response.map((note) => (
        {
          label: note.noteName,
          value: note.id
        })
      )
    },);
}


//   function notesId2(includingValue,allNotes){
//     // console.log(allNotes)
//     includingValue.map((note)=>{
//       Lnote.push(note.value);
//       console.log(Lnote);
//       const AllnoteObject=[];
//       Lnote.map((noteid)=>{
//         AllnoteObject.push(allNotes[noteid])
//         setAllNotesObject(AllnoteObject)
//       })
//       // console.log(AllnoteObject)
//       // console.log(allNotesObject)
//       // for(let m=0;m<Lnote.length;m++){
//       //   AllnoteObject.push(allNotes[Lnote[m]])
//       // }
//       // setAllNotesObject(AllnoteObject)
//       // return AllnoteObject
//       // console.log(allNotesObject)
      
//     })
//     // return AllnoteObject
//       // console.log(allNotesObject)
//       return allNotesObject
// }

//   function updateNotes(allnoteObject) {
//     const {token,username} = props
//     const body = 
//     {
//       "notes": allnoteObject
//     }
//     const api = {
//       "Accept": "application/json",
//       "Content-Type": "application/json",
//       "Authorization": "Bearer "+token,
//     }
//     axios.put(`http://Comp9900fightbackend1-env.eba-mqgjcvbv.ap-southeast-2.elasticbeanstalk.com/register/notes/${username}`, body, {headers: api});
//     window.location.reload(false); 
// }

function combineFunc(includingValue){
  const AllnoteObject=[]; 
  // const ALLtwo=[]; 
  const Lnote=[];
      // console.log(allNotes) //allNotes is from getAllNotes 
      includingValue.map((note)=>{
        Lnote.push(note.value);
        // console.log(Lnote);
        Lnote.map((noteid)=>{
          AllnoteObject.push(allNotes[noteid])
          console.log(AllnoteObject);

          // setAllNotesObject(AllnoteObject)
        })

        // Lnote.length=0;
        console.log('l',Lnote);
      })
      const ALLtwo=Array.from(new Set(AllnoteObject))
      console.log("20000",ALLtwo);//去重
      const {token,username} = props
      const body = 
      {
        "notes": ALLtwo
      }
      console.log(body);
      const api = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token,
      }
      axios.put(`http://Comp9900fightbackend1-env.eba-mqgjcvbv.ap-southeast-2.elasticbeanstalk.com/register/notes/${username}`, body, {headers: api})
      // .then(window.location.reload());
      // AllnoteObject.length=0;
      console.log("a2?",ALLtwo)//去重之后灵敏很多！ ??
      // console.log("AllnoteObject",AllnoteObject);
      // window.location.reload()//异步？？

}

return (
  <>
    {/* // {console.log(note)} */}
    <Modal onClose={ onClose }>
      <div className="d-flex justify-content-between" style={{padding:"10px 0 40px 0"}}>
        <h5 >Set My Favourite Notes</h5>
        <button style={{backgroundColor:"powderblue",border: 'none',borderRadius: "5px"}} onClick={onClose}>X</button>
      </div>

        <Col span={100}>
          <SearchSelect
            mode="multiple"
            value={includingValue}//影响提交
            // defaultValue={CurrentincludingValue}//没法显示，原因不详
            placeholder="Search my favourite notes..."
            fetchOptions={fetchNoteList}
            onChange={
              (newValue) => {
              setIncludingValue(newValue);
              // console.log(Lnote)
              
              // console.log(includingValue,"includingvalue");
              // console.log(newValue,"newvalue");
              // // console.log(allNotes);
              // notesId2(includingValue,allNotes);
            }}
            style={{
              width: '100%',}}
          />
        </Col>
        <div class="d-grid gap-12 col-6 mx-auto">

          <button style={{backgroundColor:"powderblue",margin:"12px",border: 'none',borderRadius: "5px"}} size="md" onClick={() => combineFunc(includingValue)}>First, Submit Favourite Notes In Above Box</button>

          <button size="md" style={{backgroundColor:"powderblue",margin:"12px",border: 'none',borderRadius: "5px"}} onClick={() => window.location.reload()}>Then Click This BUTTON To Show The New Profile</button>

</div>
    </Modal>
  </>
  )
}
export default NotesBar;
