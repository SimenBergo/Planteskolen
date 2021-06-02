import React, { Component } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../utils/Auth';

class UsersInsert extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            role: '',
            password: '',
            passwordRepeat: '',
            resetPasswordToken: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    handleInputChange(event) {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
        [name]: value
        });

    }

    handleSubmit = async (event) => {
        event.preventDefault();
        
        if(this.validateInput() === 'fillAllFields'){
            window.alert('Please fill out all the input fields.');
        }
        else if(this.validateInput() === 'password'){
            window.alert('Password must contain numbers and letters, and be at least 8 characters long.');
        }
        else if(this.validateInput() === 'passwordMatch'){
            window.alert('Passwords must match.');
        }
        else if(this.validateInput() === 'valid'){
            
            const payload = this.setAnonymous();
            
            await api.insertUser(payload)
            .then(res => {
                if(res.status === 201){
                window.alert(`User inserted successfully!`)
                
                    this.setState({
                        name: '',
                        surname: '',
                        email: '',
                        role:'',
                        password: '',
                        passwordRepeat: '',
                        resetPasswordToken: ''
                    });
                    window.location.reload();
                }
            })
            .catch(err => { console.log(err) })
            }
    }

    setAnonymous(){
        if(this.state.role === ""){
                const role = 'anonymous';
                const { name, surname, email, password, resetPasswordToken } = this.state;
                const resetPasswordExpires = new Date();

                return {name, surname, email, password, role, resetPasswordToken, resetPasswordExpires };
            } else {
                let { name, surname, email, password, role, resetPasswordToken } = this.state;
                const resetPasswordExpires = new Date();
                return {name, surname, email, password, role, resetPasswordToken, resetPasswordExpires };
            }
    }

    validateInput(){
        //creating a constant for a regular expression to check if password contains in order: at least one letter, at least one number and is at least 8 characters long
        const checkPassword = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");

        if(!this.state.name || !this.state.surname || !this.state.email || !this.state.password || !this.state.passwordRepeat){
            return 'fillAllFields';
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
        return (
            <>
                <div className='create-user'>
                    <h2>Create User</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>Name:
                            <input
                            name='name'
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            type='text'
                            placeholder='First name'/>
                        </label>

                        <label>Surname:
                            <input
                            name='surname'
                            value={this.state.surname}
                            onChange={this.handleInputChange}
                            type='text'
                            placeholder='Surname'/>
                        </label>

                        <label>Email address:
                            <input
                            name='email'
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            type='email'
                            placeholder='Email address'/>
                        </label>

                        {this.context.isManager &&
                        <label>Role:
                            <select name='role' value={this.state.role} onChange={this.handleInputChange}>
                                <option defaultValue='anonymous'>Anonymous</option>
                                <option value='gardener'>Gardener</option>
                                <option value='manager'>Manager</option>
                            </select>
                        </label>
                        }
                        <label>Password:
                            <input
                            name='password'
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            type='password'
                            placeholder='Password'/>
                        </label>

                        <label>Repeat password:
                            <input
                            name='passwordRepeat'
                            value={this.state.passwordRepeat}
                            onChange={this.handleInputChange}
                            type='password'
                            placeholder='Repeat password'/>
                        </label>

                        <input
                        className='submitButton'
                        type='submit'
                        value='Sign up'
                        />
                    </form>
                </div>
            </>
        );
    }
}

export default UsersInsert;