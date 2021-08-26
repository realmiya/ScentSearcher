import React from 'react';
import { BACKEND_URL }from '../../env';
import styled from 'styled-components';
import withModal from '../../components/withModal';
import UpdateProfileModal from '../../components/UpdateProfileModal';
import NotesBar from './component/bar';
import getAllNotes from '../../utils/getAllNotes';
const axios = require('axios');



const LogoImg  = styled.img.attrs({
    src: '/image/profileIMG.jpg'
  })`
  width: 260px;
  height: 280px;
  padding: 25px;
  `;


const Flexdiv = styled.div`
  display:flex;
  padding-top: 20px;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  padding:20px;
`;


class UserProfile extends React.Component {
    constructor(props){
        super(props); 
        this.state={
            currentValue:'',
            username:'',
            firstName:'',
            lastName:'',
            gender:'',
            token:'',
            notes:[],
            allnotes:[],
            id:0,
        }

    }


    fetchUserDetails=()=>{
        const username = localStorage.getItem("username");
        // console.log(username);
        const token = localStorage.getItem("JWT_TOKEN");
        // console.log(token);
        axios.get(`${BACKEND_URL}/register/${username}`,{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
              }
        }).then(res=>{
            this.setState({username:res.data.username});
            this.setState({firstName:res.data.firstName});
            this.setState({lastName:res.data.lastName});
            this.setState({gender:res.data.gender})
            this.setState({token:token})
            this.setState({notes:res.data.notes})
            this.setState({id:res.data.id}) 
        })
        .catch(err=>console.log(err))
    }

    currentNotes(note){
        console.log(note);
        const options = [];
        console.log(typeof note.noteName)
        note.map((note) => {
          options.push({
            value: note.id,
            label: `${note.noteName}`,
            key: note.id,
          })
          }
        )
        this.setState({currentValue:options})
        // console.log(this.state.currentValue)
      }

    componentDidMount(){
     this.fetchUserDetails();
     getAllNotes().then(res=>{
         this.setState({allNotes:res})
     })
     
    }



    render(){
        return (
            <div className="container">
                <h1 >My Profile </h1>
                <div className="card">
                    <LogoImg className="container"></LogoImg>  
                    <Flexdiv>
                    <h5 className="list-group-item">My Username: {this.state.username}</h5>
                        <ul className="list-group">
                            <li className= "list-group-item list-group-item-primary">Gender: {this.state.gender}</li>
                            <li className= "list-group-item list-group-item-primary">My Full Name: {this.state.firstName} {this.state.lastName}</li>
                        </ul>
                        <button href="#" className="btn btn-primary" style={{margin:"8px"}} onClick={() => this.props.handleShowModalChange('UpdateProfile')}>Change My Password</button>   
                        {this.props.showModal === 'UpdateProfile' && (
                        <UpdateProfileModal
                        onClose= {this.props.closeModal}
                        token = {this.state.token}
                        username = {this.state.username}
                        />
                    )}
                        {this.state.notes.length>0&&(
                            <section style={{padding:"40px 0px 0px 0px"}}>
                            <ul className="list-group">
                            <li className="list-group-item font-weight-bolder">My Favourite Notes</li>
                                {this.state.notes.map((note, index) => (
                                    <li className= "list-group-item list-group-item-action list-group-item-info" key={index}>{note.noteName}</li>
                                ))}
                            </ul>
                        </section>
                        )}
                        <button href="#" className="btn btn-info" style={{margin:"8px"}} onClick={() => {this.props.handleShowModalChange('UpdateNotes'); this.currentNotes(this.state.notes) }}>Set My Favourite Notes</button>   
                        {this.props.showModal === 'UpdateNotes' && (     
                        <NotesBar
                        onClose = {this.props.closeModal}
                        token = {this.state.token}
                        username = {this.state.username}
                        currentValue = {this.state.currentValue}
                        allNotes = {this.state.allNotes}
                        />
                    )}

                    </Flexdiv>   
                    
                </div>
            </div>
                )
        }
} 
export default withModal(UserProfile); 