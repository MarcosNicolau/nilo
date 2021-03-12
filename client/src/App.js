import "./styles/index.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/nav";
import Controller from "./components/controller";

const App = () => {
	return (
		<Router>
			<Nav />
			<Controller />
		</Router>
	);
};

export default App;
