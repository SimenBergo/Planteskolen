import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from '../utils/Auth';
  
const GardenerRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isGardenerFunc }) => (
      <Route {...rest} render={({ props }) =>
        isGardenerFunc() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/plant-overview",
                state: { from: props.location }
              }}
            />
          )}
        />
      )}
  </AuthConsumer>
);

export default GardenerRoute;