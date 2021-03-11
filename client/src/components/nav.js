import { useState } from "react";
import { Link } from "react-router-dom";
import userIcon from "../assets/nav/user.svg";
import homeIcon from "../assets/nav/home.svg";
import LikeIcon from "../assets/like.svg";
import playlistIcon from "../assets/nav/playlist.svg";
import arrowIcon from "../assets/nav/arrow.svg";
import plusIcon from "../assets/plus.svg";
import navStyles from "../styles/nav.module.scss";

const Nav = () => {
	const [playlist, setPlaylist] = useState(false);

	return (
		<nav>
			<img src={userIcon} alt="user icon" className={navStyles.userIcon} />

			<Link to="/home" className={`${navStyles.linkContainers} ${navStyles.home}`}>
				<img src={homeIcon} alt="home icon" />
				Home
			</Link>

			<p className={navStyles.yourLibrary}>Your Library</p>

			<Link to="/liked-songs" className={`${navStyles.linkContainers} ${navStyles.likedSongs}`}>
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
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
					<Link to={"/playlist/34u2804780392"}>Playlist name</Link>
				</div>
			</div>

			<div className={`${navStyles.linkContainers} ${navStyles.actionBtnsContainer}`}>
				<button className={`${navStyles.linkContainers}`}>
					<img src={plusIcon} alt="add song" /> New Song
				</button>
				<button className={`${navStyles.linkContainers}`}>
					<img src={plusIcon} alt="add playlist" /> New Playlist
				</button>
			</div>
		</nav>
	);
};

export default Nav;
