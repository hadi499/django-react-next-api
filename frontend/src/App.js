import "./App.css";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import AddPost from "./components/AddPost";
import Single from "./components/Single";
import Edit from "./components/Edit";
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
