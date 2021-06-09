import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

import Projectinfo from "./components/misc/project-info";
import Plantoverview from "./components/plants/plant-overview";
import Plantpage from "./components/plants/plant-page";
import Login from "./components/form/login";
import Nav from "./components/misc/navbar";
import Manager from "./components/manager/manager";
import Footer from "./components/misc/footer";
import PrivateRoute from "./routes/PrivateRoute";
import GardenerRoute from './routes/GardenerRoute';
import ManagerRoute from './routes/ManagerRoute';
import UsersUpdate from './components/manager/UsersUpdate';
import ForgotPassword from './components/form/forgot-password';
import ResetPassword from './components/form/reset-password';
import { AuthConsumer } from './utils/Auth';
import { AuthContext } from './utils/Auth';
import UpdateSelf from './components/gardener/UpdateSelf';
import PlantsUpdate from './components/plants/PlantsUpdate';
import UserProfile from './components/gardener/UserProfile';
import PlantsInsert from './components/plants/PlantsInsert';
import UsersInsert from './components/manager/UsersInsert';

class App extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  static contextType = AuthContext;

  render() {

    return (
      <div className="App">
        <AuthConsumer>
          {({ isAuth, isManager }) => (
            <Router>
          <div className="App">
          <header className="App-header">
            <Nav isAuth={ isAuth } isManager= {isManager} handleLogOut={this.handleLogOut}/>
            </header>
            <main>
              <Switch>
                <Route exact path="/" component = {Projectinfo} />
                <Route exact path="/plant-overview" component = {Plantoverview}/>
                <Route exact path="/plant-page/:id" component = {Plantpage}/>
                <Route exact path="/login" component = {Login} />

                <Route exact path="/signup">
                  <UsersInsert />
                </Route>
                <Route exact path="/forgotpassword">
                  <ForgotPassword />
                </Route>
                <Route exact path="/reset/:token">
                  <ResetPassword />
                </Route>
              </Switch>
              {/* Private routes only for logged in users */}
              <PrivateRoute exact path="/profile">
                <UserProfile />
              </PrivateRoute>
              <PrivateRoute exact path="/profile/update">
                <UpdateSelf />
              </PrivateRoute>

              {/* Private route only for gardeners */}
              <GardenerRoute exact path="/gardener/updateplant" component={PlantsUpdate} />
              
              {/* Private route only for managers */}
              <ManagerRoute component={PlantsInsert} exact path="/add-plant" />
              <ManagerRoute component={Manager} exact path="/managerpage" />
              <ManagerRoute component={UsersUpdate} exact path="/manager/update" />
            </main>
            <Footer />
          </div>
        </Router>
        )}
        </AuthConsumer>
      </div>
    );
  }

  handleLogOut () {
    this.context.logout();
    window.location.href = `/login`;
  }
}



export default App;