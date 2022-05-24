import "./App.css";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import AddPost from "./components/AddPost";
import Single from "./components/Single";
import Edit from "./components/Edit";
import Login2 from "./components/auth/Login2";
import Logout from "./components/auth/Logout";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Post} />
          <Route path="/create" component={AddPost} />
          <Route path="/post/:slug" component={Single} />
          <Route path="/edit/:slug" component={Edit} />
          <Route path="/login" component={Login2} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
