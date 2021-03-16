import { useState } from "react";
import { Link } from "react-router-dom";
import userIcon from "../../assets/nav/user.svg";
import homeIcon from "../../assets/nav/home.svg";
import LikeIcon from "../../assets/like.svg";
import playlistIcon from "../../assets/nav/playlist.svg";
import arrowIcon from "../../assets/nav/arrow.svg";
import mySongsIcon from "../../assets/nav/my-music.svg";
import CreateBtns from "../new-songs-playlists/create-btns";
import navStyles from "../../styles/layout/nav.module.scss";

const Nav = () => {
	const [playlist, setPlaylist] = useState(true);
	const [selectedSection, setSelectedSection] = useState("home");
	const borderStyle = "solid .2rem #FFE156";

	return (
		<nav>
			<img src={userIcon} alt="user icon" className={navStyles.userIcon} />

			<Link
				to="/home"
				className={`${navStyles.linkContainers} ${navStyles.home}`}
				style={{ borderLeft: selectedSection === "home" && borderStyle }}
				onClick={() => setSelectedSection("home")}
			>
				<img src={homeIcon} alt="home icon" />
				Home
			</Link>

			<p className={navStyles.yourLibrary}>Your Library</p>

			<Link
				to="/liked-songs"
				className={`${navStyles.linkContainers} ${navStyles.likedSongs}`}
				style={{ borderLeft: selectedSection === "liked-songs" && borderStyle }}
				onClick={() => setSelectedSection("liked-songs")}
			>
				<img src={LikeIcon} alt="like icon" /> Liked songs
			</Link>

			<Link
				to="/my-songs"
				className={`${navStyles.linkContainers} ${navStyles.likedSongs}`}
				style={{ borderLeft: selectedSection === "my-songs" && borderStyle }}
				onClick={() => setSelectedSection("my-songs")}
			>
				<img src={mySongsIcon} alt="like icon" /> My Songs
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
					<Link
						to={"/playlist/34u2804780392"}
						style={{
							borderLeft: selectedSection === "playlists/34u2804780392" && borderStyle,
							color: selectedSection === "playlists/34u2804780392" && "#fbfbff",
						}}
						onClick={() => setSelectedSection("playlists/34u2804780392")}
					>
						Playlist name
					</Link>
				</div>
			</div>
			<CreateBtns />
		</nav>
	);
};

export default Nav;
