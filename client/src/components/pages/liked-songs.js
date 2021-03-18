import { useState, useEffect } from "react";
import axios from "axios";
import SongsDisplay from "../songs-display";

const LikedSongs = () => {
	const [likedSongs, setLikedSongs] = useState("loading");
	const getMySongs = async () => {
		const res = await axios.get("/songs/liked-songs");
		setLikedSongs(res.data);
	};
	useEffect(() => getMySongs(), []);
	return <SongsDisplay playlist={likedSongs} sectionName="Liked Songs" />;
};

export default LikedSongs;
