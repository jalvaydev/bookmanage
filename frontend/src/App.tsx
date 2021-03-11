import Login from "./login";
import Register from "./register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Book from "./book/[id]";
import NotFound from "./notfound";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/book/:id" component={Book} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
