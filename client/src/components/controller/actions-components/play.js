import playBtn from "../../../assets/controls/play.svg";
import pauseBtn from "../../../assets/controls/pause.svg";
import controllerStyles from "../../../styles/layout/controller.module.scss";
import { useCurrentSongContext } from "../../../current-song/context";

const Play = ({ song }) => {
	const { state, dispatch, actions } = useCurrentSongContext();

	return (
		<>
			{state.paused ? (
				<img
					src={playBtn}
					alt="play pause"
					className={controllerStyles.playBtn}
					onClick={() => {
						if (!song.current.currentSrc) return;
						song.current.play();
						dispatch({ type: actions.PLAY_PAUSE_SONG });
					}}
				/>
			) : (
				<img
					src={pauseBtn}
					alt="play pause"
					className={controllerStyles.playBtn}
					onClick={() => {
						if (!song.current.currentSrc) return;
						song.current.pause();
						dispatch({ type: actions.PLAY_PAUSE_SONG });
					}}
				/>
			)}
		</>
	);
};

export default Play;
