import { useState, useEffect } from "react";
import Song from "../song/index";
import axios from "axios";

const MySongs = () => {
	const [mySongs, setMySongs] = useState([]);
	const getMySongs = async () => {
		const res = await axios.get("/songs/my-songs");
		setMySongs(res.data);
	};

	useEffect(() => getMySongs(), []);

	return (
		<div className="container background" style={{ background: "transparent" }}>
			{mySongs.map((mySong) => (
				<Song key={mySong.id} songName={mySong.songName} artist={mySong.artist} />
			))}
		</div>
	);
};

export default MySongs;
