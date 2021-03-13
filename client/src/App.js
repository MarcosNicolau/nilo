import "./styles/index.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import UserContext from "./user-context";
import Nav from "./components/nav";
import Controller from "./components/controller";
import Login from "./components/auth/login";
import SignIn from "./components/auth/sign-in";

const App = () => {
	const [user, setUser] = useState("Loading");
	const getUser = async () => {
		const res = await axios.get("/auth/is-user-connected");
		setUser(res.data);
	};

	useEffect(() => getUser(), []);

	if (user === "Loading")
		return (
			<div className="background">
				<h1>Loading...</h1>
			</div>
		);

	if (user === false)
		return (
			<Router>
				<Switch>
					<Route path="/signin" component={SignIn} />
					<Route path="/" component={Login} />
				</Switch>
			</Router>
		);

	return (
		<UserContext.Provider>
			<Router>
				<Nav />
				<Controller />
			</Router>
		</UserContext.Provider>
	);
};

export default App;
