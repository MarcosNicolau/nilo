import sectionBarSyles from "../../styles/layout/section-bar.module.scss";
import shuffleIcon from "../../assets/shuffle.svg";
import { useCurrentSongContext } from "../../current-song/context";

const ShufflePlay = ({ sectionName, playlist }) => {
	const { dispatch, actions } = useCurrentSongContext();
	return (
		<>
			<h2 className={sectionBarSyles.sectionName}>{sectionName}</h2>
			<img
				src={shuffleIcon}
				alt="shufflePlay"
				className={sectionBarSyles.shufflePlay}
				onClick={() => {
					dispatch({ type: actions.SHUFFLE_PLAY, payload: playlist });
				}}
			/>
		</>
	);
};

export default ShufflePlay;
