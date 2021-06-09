import React, { Component } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import { setResetToken } from '../../utils/storage';

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  //Function for sending the reset email
  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
      });
    } else {
      try {

        //if email is not blank, it sends the email to the back-end function
        const response = await api.forgotPassword({email});
        if (response.data) {
          this.setState({
            showError: false,
            messageFromServer: 'recovery email sent',
            showNullError: false,
          });
          return setResetToken(response.data);
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          this.setState({
            showError: true,
            messageFromServer: '',
            showNullError: false,
          });
        }
      }
    }
  };

  render() {
    const {email, messageFromServer, showNullError, showError } = this.state;

    return (
      <div>
        <h2>Forgotten password</h2>
        <p>Type in your email and submit to recieve a link in your mailbox, to reset your password</p>
        <form className="profile-form" onSubmit={this.sendEmail}>
          <input
            id="email"
            label="email"
            value={email}
            onChange={this.handleChange('email')}
            placeholder="Email Address"
          />
          <br />
          <input
          type='submit'
          value='Reset password'
          />
        </form>
        {showNullError && (
          <div>
            <p>The email address cannot be null.</p>
          </div>
        )}
        {showError && (
          <div>
            <p>
              That email address isn&apos;t recognized. Please try again or
              register for a new account.
            </p>
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )}
        <p><Link to="/login">Back to login page</Link></p>
      </div>
    );
  }
}

export default ForgotPassword;