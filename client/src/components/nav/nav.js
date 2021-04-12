import { useState } from "react";
import { Link } from "react-router-dom";
import userIcon from "../../assets/nav/user.svg";
import homeIcon from "../../assets/nav/home.svg";
import LikeIcon from "../../assets/light/like.svg";
import playlistIcon from "../../assets/nav/playlist.svg";
import arrowIcon from "../../assets/nav/arrow.svg";
import mySongsIcon from "../../assets/nav/my-music.svg";
import CreateBtns from "../new-songs-playlists/create-btns";
import navStyles from "../../styles/layout/nav.module.scss";
import Playlists from "./playlists";

const Nav = () => {
	const [playlist, setPlaylist] = useState(true);
	const [selectedSection, setSelectedSection] = useState(window.location.pathname);
	return (
		<nav>
			<img src={userIcon} alt="user icon" className={navStyles.userIcon} />
			<Link
				to="/"
				className={`${navStyles.linkContainers} ${navStyles.home} ${
					selectedSection === "/" && navStyles.activeLink
				}`}
				onClick={() => setSelectedSection("/")}
			>
				<img src={homeIcon} alt="home icon" />
				Home
			</Link>

			<p className={navStyles.yourLibrary}>Your Library</p>
			<Link
				to="/my-songs"
				className={`${navStyles.linkContainers} ${navStyles.likedSongs} ${
					selectedSection === "/my-songs" && navStyles.activeLink
				}`}
				onClick={() => setSelectedSection("/my-songs")}
			>
				<img src={mySongsIcon} alt="like icon" /> My Songs
			</Link>
			<Link
				to="/liked-songs"
				className={`${navStyles.linkContainers} ${navStyles.likedSongs} ${
					selectedSection === "/liked-songs" && navStyles.activeLink
				}`}
				onClick={() => setSelectedSection("/liked-songs")}
			>
				<img src={LikeIcon} alt="like icon" /> Liked songs
			</Link>
			<div className={`${navStyles.playlistContainer}`}>
				<button
					className={`${navStyles.playlistsBtn} ${navStyles.linkContainers}`}
					onClick={() => setPlaylist((prev) => !prev)}
				>
					<img src={playlistIcon} alt="playlist icon" /> Playlists
					<img src={arrowIcon} alt="dropdown arrow icon" style={{ height: "1.2em" }} />
				</button>

				<div className={`${navStyles.playlists} ${playlist && navStyles.playlistsActive}`}>
					<Playlists selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
				</div>
			</div>
			<CreateBtns />
		</nav>
	);
};

export default Nav;
