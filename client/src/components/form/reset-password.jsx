import React, { Component } from 'react';
import api from '../../api/api';
import { getResetToken } from '../../utils/storage';

class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      passwordRepeat: '',
      updated: false,
      isLoading: true,
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    
  }

  async componentDidMount() {
    //Retrieving resetPasswordToken from localstorage, and using it to 
    //compare with the one in the DB for authorization.
    const token = getResetToken();
    try {
      const response = await api.resetPassword({
        params: {
          resetPasswordToken: token
        },
      });
      if (response.data.message === 'password reset link is valid') {
        this.setState({
          email: response.data.email,
          updated: false,
          isLoading: false,
          error: false,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    this.setState({ [name]: value });
}

//Function to check that all the fields are filled in
  updatePassword = async (e) => {
    e.preventDefault();
    const email = this.state.email;
    const { password } = this.state;
    const token = getResetToken();
    
    if(this.validatePassword() === 'fillBothFields'){
      window.alert('Please fill out all the input fields.');
  }
  else if(this.validatePassword() === 'password'){
      window.alert('Password must contain numbers and letters, and be at least 8 characters long.');
  }
  else if(this.validatePassword() === 'passwordMatch'){
      window.alert('Passwords must match.');
  }
  else if(this.validatePassword() === 'valid'){
    try {
      const response = await api.updatePasswordViaEmail({
          email,
          password,
          token,
        },
      );
      console.log(response.data);
      if (response.data.message === 'password updated') {
        this.setState({
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
  };

  validatePassword(){
    //made some changes to validation function from usersInsert component
    const checkPassword = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");

    if(!this.state.password || !this.state.passwordRepeat){
      return 'fillBothFields';
    }
    else if(!checkPassword.test(this.state.password)){
      return 'password';
    }
    else if(this.state.password !== this.state.passwordRepeat){
      return 'passwordMatch';
    }
    else{
      return 'valid';
    }
}

  render() {
    const { password, passwordRepeat, error, isLoading, updated } = this.state;

    if (error) {
      return (
        <div>
          <h2>Reset password:</h2>
          
            <h4>Problem resetting password. Please send another reset link.</h4>
          </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
    return (
      <div>
        <h2>Reset Password: </h2>
        <form className="password-form" onSubmit={this.updatePassword}>
          <label>New password:
            <input
              name='password'
              value={password}
              onChange={this.handleChange}
              type='password'
              placeholder='New password'
            />
          </label>

          <label>Repeat new password:
            <input
              name='passwordRepeat'
              value={passwordRepeat}
              onChange={this.handleChange}
              type='password'
              placeholder='Repeat new password'
            />
          </label>
          <input
          type='submit'
          value='Update password'
          />
        </form>

        {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try logging in
              again.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default ResetPassword;