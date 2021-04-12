import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentSongContext } from "../../current-song/context";
import songStyles from "../../styles/layout/song.module.scss";
import Play from "./action-components/play";
import Like from "./action-components/like";
import Duration from "./action-components/duration";
import AddToPlayList from "./action-components/add-to-playlist/";
import DeleteFromPlaylist from "./action-components/delete-from-playlist/";

const SongContext = createContext("");
const useSongContext = () => useContext(SongContext);

const Song = ({ song, playlist, isInPlaylist, setPlaylist }) => {
	const [addToPlaylist, setAddToPlaylist] = useState(false);
	const { dispatch, actions } = useCurrentSongContext();
	useEffect(
		() =>
			setSongInfo((prev) => {
				return { ...prev, playlist, index: song.index };
			}),
		[playlist, song]
	);

	const [songInfo, setSongInfo] = useState({
		_id: song._id,
		songName: song.songName,
		artist: song.artist,
		audio: song.audio,
		image: song.image,
		index: song.index,
		duration: song.duration,
		playlist: playlist,
		isLiked: song.isLiked,
	});
	const playMusic = () => {
		if (addToPlaylist) return;
		dispatch({ type: actions.CHANGE_SONG, payload: songInfo });
	};
	if (songInfo.index === 0)
		return (
			<SongContext.Provider value={{ songInfo, setSongInfo, addToPlaylist, setAddToPlaylist }}>
				<div className={songStyles.songContainer} onDoubleClick={playMusic}>
					<Play />
					<img src={songInfo.image} alt="song" className={songStyles.songImg} />
					<div className={songStyles.songInfoContainer} style={{ width: "25%" }}>
						<h4 className={songStyles.songInfo}>Name</h4>
						<p className={songStyles.songName} style={{ width: "100%" }}>
							{songInfo.songName}
						</p>
					</div>
					<div className={songStyles.songInfoContainer}>
						<h4 className={songStyles.songInfo}>Artist</h4>
						<p>{songInfo.artist}</p>
					</div>
					<div className={songStyles.songInfoContainer}>
						<h4 className={songStyles.songInfo}>Duration</h4>
						<Duration />
					</div>
					<div className={songStyles.songInfoContainer}>
						<h4 className={songStyles.songInfo}>Like</h4>
						<Like songInfo={songInfo} />
					</div>
					<div className={songStyles.songInfoContainer}>
						<h4 className={songStyles.songInfo}>
							{isInPlaylist ? "Remove from playlist" : "Add to playlist"}
						</h4>
						{isInPlaylist ? <DeleteFromPlaylist setPlaylist={setPlaylist} /> : <AddToPlayList />}
					</div>
				</div>
			</SongContext.Provider>
		);

	return (
		<SongContext.Provider value={{ songInfo, setSongInfo, addToPlaylist, setAddToPlaylist }}>
			<div className={songStyles.songContainer} onDoubleClick={playMusic}>
				<Play />
				<img src={songInfo.image} alt="song" className={songStyles.songImg} />
				<p className={songStyles.songName}>{songInfo.songName}</p>
				<p>{songInfo.artist}</p>
				<Duration />
				<Like songInfo={songInfo} />
				{isInPlaylist ? <DeleteFromPlaylist setPlaylist={setPlaylist} /> : <AddToPlayList />}
			</div>
		</SongContext.Provider>
	);
};

export default Song;
export { useSongContext };
