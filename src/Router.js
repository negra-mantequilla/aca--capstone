import { Switch, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Clients from "./components/Clients";
import Register from "./components/Register";
import Profile from "./components/Profile"

export default function Router(props) {
  const { loggedIn, setLoggedIn } = props;
  return (
    <div>
      <BrowserRouter>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route
            exact
            path="/login"
            component={() => <Login setLoggedIn={setLoggedIn} />}
          />
          <Route
            exact
            path="/clients"
            component={(props) => (
              <Clients loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            )}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
