import { useState, useEffect } from "react";
import axios from "axios";
import SongsDisplay from "../songs-display";

const LikedSongs = () => {
	const [likedSongs, setLikedSongs] = useState("loading");
	useEffect(() => {
		const source = axios.CancelToken.source();
		const getLikedSongs = async () => {
			try {
				const res = await axios.get("/songs/liked-songs", { cancelToken: source.token });
				setLikedSongs(res.data);
			} catch (err) {
				if (axios.isCancel(err));
			}
		};
		getLikedSongs();
		return () => source.cancel();
	}, []);

	return <SongsDisplay playlist={likedSongs} sectionName="Liked Songs" />;
};

export default LikedSongs;
