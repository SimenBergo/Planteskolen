import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from '../utils/Auth';

//checking if user is manager with isManagerFunc and rendering component if true
//else redirect to /profile
const ManagerRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isManagerFunc }) => (
      <Route {...rest} render={({ props }) =>
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