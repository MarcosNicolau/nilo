import { useState, useEffect } from "react";
import axios from "axios";
import SongsDisplay from "../songs-display";

const MySongs = () => {
	const [mySongs, setMySongs] = useState("loading");
	const getMySongs = async () => {
		const res = await axios.get("/songs/my-songs");
		setMySongs(res.data);
	};

	useEffect(() => getMySongs(), []);
	return <SongsDisplay playlist={mySongs} sectionName="My Songs" />;
};

export default MySongs;
