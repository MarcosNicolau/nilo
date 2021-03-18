import songStyles from "../../styles/layout/song.module.scss";
import Song from "../song/index";
import SectionBar from "../utils/section-bar";
import ShufflePlay from "../utils/shuffle-play";
import Main from "../utils/main-content";

const SongsDisplay = ({ playlist, sectionName }) => {
	if (playlist === "loading")
		return (
			<Main>
				<h1 style={{ color: "black" }}>Loading...</h1>
			</Main>
		);
	if (!playlist.length)
		return (
			<Main>
				<h1 style={{ color: "black" }}>You don't have any songs</h1>
			</Main>
		);
	return (
		<Main>
			<SectionBar>
				<ShufflePlay playlist={playlist} sectionName={sectionName} />
			</SectionBar>

			<div className={`${songStyles.songsContainer}`}>
				{playlist.map((song, index) => (
					<Song
						playlist={playlist}
						key={song._id}
						id={song._id}
						songName={song.songName}
						artist={song.artist}
						duration={song.duration}
						audio={song.audio}
						image={song.image}
						index={index}
						isLiked={song.isLiked}
					/>
				))}
			</div>
		</Main>
	);
};

export default SongsDisplay;
