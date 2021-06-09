import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from '../utils/Auth';
  
//if user is logged in then render children, else redirect to login
const PrivateRoute = ({ children, ...rest }) => (
  <AuthConsumer>
    {({ isAuthFunc }) => (
      <Route {...rest} render={() =>
        isAuthFunc() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )}
        />
      )}
  </AuthConsumer>
);

export default PrivateRoute;