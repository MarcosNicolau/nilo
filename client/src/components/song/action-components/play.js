import { useCurrentSongContext } from "../../../current-song/context";
import { useSongContext } from "../index";
import songStyles from "../../../styles/layout/song.module.scss";
import playIcon from "../../../assets/dark/play.svg";

const Play = () => {
	const { dispatch, actions } = useCurrentSongContext();
	const { songInfo } = useSongContext();
	const playSong = () => {
		dispatch({ type: actions.CHANGE_SONG, payload: songInfo });
	};

	return <img src={playIcon} alt="play-song" className={songStyles.playBtn} onClick={playSong} />;
};

export default Play;
