import React from 'react';
import Input from '../Input';
import FormItem from '../FormItem';
import ErrorMessage from '../ErrorMessage';
import Modal from '../Modal';
import validate from './validate';
import { BACKEND_URL }from '../../env';
const axios = require('axios');


const initialData = {
  value: '',
  blurred: false,
};
const ENCRYPTION_STRENGTH = 10;
const encodePassword = (password) => {
  const bcrypt = require("bcryptjs");
  const salt = bcrypt.genSaltSync(ENCRYPTION_STRENGTH);
  const code = bcrypt.hashSync(password, salt);
  return code;
};

class UpdateProfileModal extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      data: {
        password: initialData,
        confirmPassword: initialData,
      },
      isFormSubmit: false,
    };

    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleIsFormSubmitChange = this.handleIsFormSubmitChange.bind(this);
    this.handleBlurredChange = this.handleBlurredChange.bind(this);
    this.updateProfileHandler = this.updateProfileHandler.bind(this);
  }

  getErrorMessage(error, name) {
    const { data, isFormSubmit } = this.state;
    const showInputError = data[name].blurred;

    return (showInputError || isFormSubmit) && error[name];
  }

  getError() {
    const { data } = this.state;

    const error = {};

    Object.keys(data).forEach((name) => {
      const errorOfName = validate(name, data);

      if (!errorOfName) {
        return;
      }

      error[name] = errorOfName;
    });

    return error;
  }

  setData(name, newData) {     
    this.setState((prevState) => ({    
      data: {
        ...prevState.data,
        [name]: {
          ...prevState.data[name],
          ...newData,
        },
      },
    }));
  }

  handleIsFormSubmitChange(newIsFormSubmit) {
    this.setState({
      isFormSubmit: newIsFormSubmit,
    });
  }


  handleBlurredChange(event) {
    const { name } = event.target;
    console.log(name); //password

    this.setData(name, {
      blurred: true,
    });
    console.log(this.state.data);
  }

  handleDataChange(event) {
    const { name, value } = event.target;
    this.setData(name, {
      value,
    });
  }
  



  updateProfileHandler(e){
    const {token,username} = this.props
    console.log(token,username);
    e.preventDefault();
    const code = encodePassword(this.state.data.confirmPassword.value);
    //update-profile
    axios.put(`${BACKEND_URL}/register/${username}?encodedpassword=${code}`,{},
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token,
      }
    }).then((res)=>{
      if(res.status==200){
        alert("You have updated your password successfully:)")}
        window.location.reload();
        })
    .catch(err=>console.log(err))
}



  render() {
    const { onClose } = this.props;
    const { data } = this.state;
    const error = this.getError(data);

    const hasError = Object.keys(error).length > 0;

    return (
      <Modal>
        <div className="modal-header">
          <h5>My New Password</h5>
          <button type="button" className="close" aria-label="Close" onClick={onClose} >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            this.handleIsFormSubmitChange(true); 

            if (hasError) {
              alert("Please check your input");
              return;
            }

            console.log('state', this.state);
          }}
        >
        <div className="modal-body">
          {[
            { key: 'password', label: 'New Password' },
            { key: 'confirmPassword', label: 'Confirm New Password' },
          ].map(({ key, label }) => (
            <FormItem key={key} label={label} htmlFor={`UpdateProfile-${key}`}>
              <Input
                name={key}
                value={data[key].value}

                onChange={this.handleDataChange}
                onBlur={this.handleBlurredChange}
                error={this.getErrorMessage(error, key)}
                id={`UpdateProfile-${key}`}
              />
              <ErrorMessage>{this.getErrorMessage(error, key)}</ErrorMessage>
            </FormItem>
          ))}
          </div>
          <div className="modal-footer">
          <button className="btn btn-primary" size="md" variant="success" onClick={this.updateProfileHandler}>
            Done！Update My Password
          </button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default UpdateProfileModal;
