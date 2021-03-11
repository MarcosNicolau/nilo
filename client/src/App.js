import "./styles/index.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/nav";

const App = () => {
  return (
    <Router>
      <Nav />
    </Router>
  );
};

export default App;
