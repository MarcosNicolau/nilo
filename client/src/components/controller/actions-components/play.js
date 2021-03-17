import playBtn from "../../../assets/controls/play.svg";
import pauseBtn from "../../../assets/controls/pause.svg";
import controllerStyles from "../../../styles/layout/controller.module.scss";
import { useState } from "react";

const Play = ({ song }) => {
	const [pause, setPause] = useState(false);
	return (
		<>
			{pause ? (
				<img
					src={playBtn}
					alt="play pause"
					className={controllerStyles.playBtn}
					onClick={() => {
						if (!song.current.currentSrc) return;
						song.current.play();
						setPause((prev) => !prev);
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
						setPause((prev) => !prev);
					}}
				/>
			)}
		</>
	);
};

export default Play;
