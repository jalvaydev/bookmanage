import Layout from "./components/Layout";
import Login from "./login";
import Register from "./register";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Layout>
  );
};

export default App;
