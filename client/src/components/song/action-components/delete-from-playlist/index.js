import closeIcon from "../../../../assets/dark/close.svg";
import songStyles from "../../../../styles/layout/song.module.scss";
import { useSongContext } from "../../index";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DeleteFromPlaylist = ({ setPlaylist, playlist }) => {
	const [loading, setLoading] = useState("");
	const { songInfo } = useSongContext();
	const { id } = useParams();

	const removeSong = async () => {
		if (loading) return;
		try {
			setLoading("loading");
			await axios.post("/playlist/remove-song", {
				playlistId: id,
				songId: songInfo.id,
			});
			setLoading("");
			const filterSong = songInfo.playlist.filter((song) => song._id !== songInfo.id);
			const setIndex = filterSong.map((song, index) => {
				return { ...song, index };
			});
			setPlaylist(setIndex);
		} catch (err) {
			const res = err.response;
			console.log(res);
			setLoading("");
		}
	};

	return (
		<>
			<img
				src={closeIcon}
				alt="remove"
				onClick={removeSong}
				className={`${songStyles.actionBtns} img-hover`}
			/>
		</>
	);
};

export default DeleteFromPlaylist;
