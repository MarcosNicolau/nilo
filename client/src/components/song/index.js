import { createContext, useContext, useState } from "react";
import { useCurrentSongContext } from "../../current-song/context";
import songStyles from "../../styles/layout/song.module.scss";
import Play from "./action-components/play";
import Like from "./action-components/like";
import AddToPlayList from "./action-components/add-to-playlist";
import Duration from "./action-components/duration";

const SongContext = createContext("");
const useSongContext = () => useContext(SongContext);

const Song = ({ songName, artist, audio, image, index }) => {
	const { dispatch, actions } = useCurrentSongContext();
	const [songInfo, setSongInfo] = useState({
		songName,
		artist,
		audio,
		image,
		index,
		duration: "",
	});
	if (index === 0)
		return (
			<SongContext.Provider value={{ songInfo, setSongInfo }}>
				<div
					className={songStyles.songContainer}
					onDoubleClick={() => dispatch({ type: actions.CHANGE_SONG, payload: songInfo })}
				>
					<Play audio={audio} />
					<img src={image} alt="song" className={songStyles.songImg} />
					<div className={songStyles.songInfoContainer} style={{ width: "25%" }}>
						<h4 className={songStyles.songInfo}>Name</h4>
						<p className={songStyles.songName} style={{ width: "100%" }}>
							{songName}
						</p>
					</div>
					<div className={songStyles.songInfoContainer}>
						<h4 className={songStyles.songInfo}>Artist</h4>
						<p>{artist}</p>
					</div>
					<div className={songStyles.songInfoContainer}>
						<h4 className={songStyles.songInfo}>Duration</h4>
						<Duration audio={audio} />
					</div>
					<div className={songStyles.songInfoContainer}>
						<h4 className={songStyles.songInfo}>Like</h4>
						<Like />
					</div>
					<div className={songStyles.songInfoContainer}>
						<h4 className={songStyles.songInfo}>Add to playlist</h4>
						<AddToPlayList />
					</div>
				</div>
			</SongContext.Provider>
		);

	return (
		<SongContext.Provider value={{ songInfo, setSongInfo }}>
			<div
				className={songStyles.songContainer}
				onDoubleClick={() => dispatch({ type: actions.CHANGE_SONG, payload: songInfo })}
			>
				<Play audio={audio} />
				<img src={image} alt="song" className={songStyles.songImg} />
				<p className={songStyles.songName}>{songName}</p>
				<p>{artist}</p>
				<Duration audio={audio} />
				<Like />
				<AddToPlayList />
			</div>
		</SongContext.Provider>
	);
};

export default Song;
export { useSongContext };
