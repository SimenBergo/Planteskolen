import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from '../utils/Auth';

const ManagerRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isManagerFunc }) => (
      <Route {...rest} render={props =>
        isManagerFunc() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/profile",
                state: { from: props.location }
              }}
            />
          )}
        />
      )}
  </AuthConsumer>
);

export default ManagerRoute;