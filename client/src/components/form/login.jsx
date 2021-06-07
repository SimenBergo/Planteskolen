import React from 'react';
import { Link } from "react-router-dom";
import { Component } from 'react';
import { AuthContext } from '../../utils/Auth';

class Login extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showError: false,
            showNullError: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    //Sending the login information to the authproviders login function to set token
    //together with isAuth, isGardener and isManager
    handleLogIn = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const payload = { email, password };
        try {
            await this.context.login(payload);
            
            window.location.href = `/plant-overview`;
          } catch (error) {
            console.error(error);
            this.setState({
                showError: true
            });
          }
    };

    render() {
        const { showError} = this.state;
        return (
            <div className="Login">
                <div>
                    <h2>Log in:</h2>
                    <form onSubmit={this.handleLogIn} method="post">
                        <label>
                            Email:
                        <input required name="email" type="email" value={this.state.email}
                                    onChange={this.handleInputChange}/>
                            </label>

                            <label>
                                Password:
                        <input required name="password" type="password" value={this.state.password}
                                    onChange={this.handleInputChange}/>
                            </label>
                            <br />
                            <input type="submit" value="Log in" />
                            {showError && (
                                <div>
                                    <p>
                                    Wrong password!
                                    </p>
                                </div>
                            )}
                    </form>
                        <p><Link to="/signup">Sign Up</Link></p>
                        <p><Link to="/forgotpassword">Forgot password?</Link></p>
                </div>
            </div>
        )
    };
}

export default Login;
