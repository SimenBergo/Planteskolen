import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from '../utils/Auth';

//checking if user is gardener with isGardenerFunc and rendering component if true
//else redirect to /plant-overview
const GardenerRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isGardenerFunc }) => (
      <Route {...rest} render={({ props }) =>
        isGardenerFunc() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/plant-overview"
              }}
            />
          )}
        />
      )}
  </AuthConsumer>
);

export default GardenerRoute;