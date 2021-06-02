//Code from https://codesandbox.io/s/q9m26noky6?file=/src/helpers/AuthContext.js:0-638 
import React from 'react';
import api from '../api/api';
import { getToken, setToken, getUser, setUser, clearLocalStorage } from './storage';
const INITIAL_STATE = { isAuth: false, token: null, user: null, isManager: false, isGardener: false };

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const token = getToken();
    const user = getUser();
    
    if (token && user) {
      if(user.role === 'manager'){
        this.setState({ isAuth: true, token, user, isManager: true, isGardener: true });
      } else if(user.role === 'gardener') {
      this.setState({ isAuth: true, token, user, isGardener: true });
      } else {
        this.setState({ isAuth: true, token, user });
        }
    } 
  }

  login = async (payload) => {
    try {
      const response = await api.login(payload);
      const { token, body } = response.data;
      if(body.role === 'manager'){
        this.setState({ isAuth: true, token, body, isManager: true, isGardener: true }, () => {
        //callback to store token
        setToken(token);
        setUser(body);
      });
      }else if (body.role === 'gardener'){
        this.setState({ isAuth: true, token, body, isGardener: true }, () => {
          //callback to store token
          setToken(token);
          setUser(body);
        });
      } else {
        this.setState({ isAuth: true, token, body }, () => {
          //callback to store token
          setToken(token);
          setUser(body);
        });
      }
      
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  logout = () => {
    this.setState({ ...INITIAL_STATE }, () => {
      clearLocalStorage();
    });
  };

  generateHeaders = () => {
    const response = {};
    //we read the token from memory and if it is not yet defined, we try with the stored token
    const token = this.state.token || getToken();

    if (token) {
      response.headers = {
        Authorization: `Bearer ${token}`
      }
    }
    return response;
  }

  isAuthFunc = () => {
    //if isAuth is false but localStorage has token, then, we return true.
    return this.state.isAuth || getToken() != null;

  }

  isGardenerFunc = () => {
    if(!getUser() || !this.isAuthFunc()){
      return false;
    }
    else if(getUser().role === 'gardener' || getUser().role === 'manager'){
      return true;
    }
  }

  isManagerFunc = () => {
    if(!getUser() || !this.isAuthFunc()){
      return false;
    } else if (getUser().role === 'manager'){
      return true;
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          isGardener: this.state.isGardener,
          isManager: this.state.isManager,
          isAuthFunc: this.isAuthFunc,
          isGardenerFunc: this.isGardenerFunc,
          isManagerFunc: this.isManagerFunc,
          token: this.state.token,
          user: this.state.user,
          login: this.login,
          logout: this.logout,
          generateHeaders: this.generateHeaders
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;
export { AuthContext, AuthProvider, AuthConsumer };