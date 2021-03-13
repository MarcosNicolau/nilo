import navStyles from "../../styles/layout/nav.module.scss";
import plusIcon from "../../assets/plus.svg";
import { useNewPlaylistCtx, useNewSongCtx } from "./context";

const CreateBtns = () => {
	const { setNewSong } = useNewSongCtx();
	const { setNewPlaylist } = useNewPlaylistCtx();
	return (
		<>
			<div className={`${navStyles.linkContainers} ${navStyles.actionBtnsContainer}`}>
				<button
					className={`${navStyles.linkContainers}`}
					onClick={() => setNewSong((prev) => !prev)}
				>
					<img src={plusIcon} alt="add song" /> New Song
				</button>
				<button
					className={`${navStyles.linkContainers}`}
					onClick={() => setNewPlaylist((prev) => !prev)}
				>
					<img src={plusIcon} alt="add playlist" /> New Playlist
				</button>
			</div>
		</>
	);
};

export default CreateBtns;
