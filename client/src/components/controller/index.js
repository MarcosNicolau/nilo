import controllerStyles from "../../styles/layout/controller.module.scss";
import nextBackBtn from "../../assets/controls/next-back.svg";
import Play from "./actions-components/play";
import CurrentTime from "./actions-components/current-time";
import Range from "./actions-components/range";
import Like from "../song/action-components/like";
import { useCurrentSongContext } from "../../current-song/context";
import { useRef } from "react";

const Controller = () => {
	const { state, dispatch, actions } = useCurrentSongContext();
	const { songName, artist, duration, image, audio, index } = state;
	const song = useRef();
	return (
		<div className={controllerStyles.controllerContainer} id={"controller"}>
			<div className={controllerStyles.songInfoContainer}>
				{image ? (
					<img src={image} alt="song cover" className={controllerStyles.songCover} />
				) : (
					<div className={controllerStyles.songCover}></div>
				)}
				<div className={controllerStyles.nameArtistContainer}>
					<h4>{songName}</h4>
					<p>{artist}</p>
				</div>
			</div>

			<div className={`column`}>
				<div className={`row`}>
					<CurrentTime />
					<Range song={song} />
					{duration && <p>{`${duration.minutes}:${duration.seconds}`}</p>}
				</div>
				<div className={`row ${controllerStyles.controls}`}>
					<img
						src={nextBackBtn}
						alt="previous"
						className={controllerStyles.backBtn}
						onClick={() => dispatch({ type: actions.NEXT_BACK_SONG, payload: index - 1 })}
					/>
					<Play song={song} />
					<img
						src={nextBackBtn}
						alt="next"
						onClick={() => dispatch({ type: actions.NEXT_BACK_SONG, payload: index + 1 })}
					/>
				</div>
			</div>
			<div className={controllerStyles.actionBtns}>
				<Like songInfo={state} isLight="true" />
			</div>
			<audio
				ref={song}
				src={audio}
				autoPlay
				onTimeUpdate={(e) =>
					dispatch({ type: actions.SET_CURRENT_TIME, payload: e.target.currentTime })
				}
				onEnded={() => {
					if (state.isShufflePlay) return dispatch({ type: actions.SHUFFLE_PLAY });
					dispatch({ type: actions.NEXT_BACK_SONG, payload: index + 1 });
				}}
			></audio>
		</div>
	);
};

export default Controller;
