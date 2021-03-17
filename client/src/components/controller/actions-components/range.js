import { useCurrentSongContext } from "../../../current-song/context";
import controllerStyles from "../../../styles/layout/controller.module.scss";

const Range = ({ song }) => {
	const { dispatch, actions } = useCurrentSongContext();
	const handleRange = (e) => {
		dispatch({ type: actions.SET_CURRENT_TIME, payload: e.target.value });
		song.current.currentTime = e.target.value;
	};
	if (!song.current)
		return <input disabled className={controllerStyles.songLength} type="range" value="0" />;
	return (
		<input
			className={controllerStyles.songLength}
			type="range"
			value={song.current?.currentTime}
			min="0"
			max={song.current?.duration.toString()}
			onChange={handleRange}
		/>
	);
};

export default Range;
