import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SongsDisplay from "../songs-display";

const Playlist = () => {
	const { id } = useParams();
	const [playlist, setPlaylist] = useState("loading");
	const [playlistName, setPlaylistName] = useState("");

	useEffect(() => {
		const source = axios.CancelToken.source();
		const getPlaylist = async () => {
			try {
				setPlaylist("loading");
				const res = await axios.get(`/playlist/${id}`, { cancelToken: source.token });
				setPlaylist(res.data.playlist);
				setPlaylistName(res.data.playlistName);
			} catch (err) {
				if (axios.isCancel(err));
			}
		};
		getPlaylist();
		return () => source.cancel();
	}, [id]);
	return (
		<SongsDisplay
			playlist={playlist}
			sectionName={playlistName}
			isInPlaylist={true}
			setPlaylist={setPlaylist}
		/>
	);
};

export default Playlist;
