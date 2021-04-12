import plusIcon from "../../../../assets/dark/plus.svg";
import songStyles from "../../../../styles/layout/song.module.scss";
import { useSongContext } from "../../index";
import { usePlaylistsContext } from "../../../playlist/context";
import Gallery from "../../../utils/gallery/gallery";
import PlaylistGallery from "./playlist-gallery";

const AddToPlayList = () => {
	const { addToPlaylist, setAddToPlaylist } = useSongContext();
	const { playlists } = usePlaylistsContext();
	const close = (e) => {
		if (e.target.classList.contains("container")) return setAddToPlaylist((prev) => !prev);
	};

	return (
		<>
			<img
				src={plusIcon}
				alt="add-to-playlist"
				className={`${songStyles.actionBtns} img-hover`}
				onClick={() => setAddToPlaylist((prev) => !prev)}
			/>
			{addToPlaylist && (
				<div className={`${songStyles.addToPlaylistContainer} container`} onClick={close}>
					<Gallery name="Choose playlist" isDark="true">
						{playlists.map((playlist) => (
							<PlaylistGallery
								setAddToPlaylist={setAddToPlaylist}
								playlist={playlist}
								key={playlist._id}
							/>
						))}
					</Gallery>
				</div>
			)}
		</>
	);
};
export default AddToPlayList;
