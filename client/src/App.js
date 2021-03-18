import "./styles/index.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./user-context";

//Navigation and authentication import
import Nav from "./components/nav/nav";
import Controller from "./components/controller";
import Login from "./components/auth/login";
import SignIn from "./components/auth/sign-in";
import NewSong from "./components/new-songs-playlists/new-song";
import NewPlaylist from "./components/new-songs-playlists/new-playlist/new-playlist";
import NewSongPlaylistCtxProvider from "./components/new-songs-playlists/context";

//Sections import
import MySongs from "./components/pages/my-songs";
import LikedSongs from "./components/pages/liked-songs";

//Song Imports
import CurrentSongContextProvider from "./current-song/context";

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
		<UserContext.Provider value={user}>
			<CurrentSongContextProvider>
				<Router>
					<NewSongPlaylistCtxProvider>
						<Nav />
						<NewSong />
						<NewPlaylist />
					</NewSongPlaylistCtxProvider>
					<Controller />
					<Switch>
						<Route path={"/my-songs"} component={MySongs} />
						<Route path={"/liked-songs"} component={LikedSongs} />
					</Switch>
				</Router>
			</CurrentSongContextProvider>
		</UserContext.Provider>
	);
};

export default App;
