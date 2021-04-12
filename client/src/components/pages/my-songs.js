import { useState, useEffect } from "react";
import axios from "axios";
import SongsDisplay from "../songs-display";

const MySongs = () => {
	const [mySongs, setMySongs] = useState("loading");

	useEffect(() => {
		const source = axios.CancelToken.source();
		const getMySongs = async () => {
			try {
				const res = await axios.get("/songs/my-songs", { cancelToken: source.token });
				setMySongs(res.data);
			} catch (err) {
				if (axios.isCancel(err));
			}
		};
		getMySongs();
		return () => source.cancel();
	}, []);
	return <SongsDisplay playlist={mySongs} sectionName="My Songs" />;
};

export default MySongs;
