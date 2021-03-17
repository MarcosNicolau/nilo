import { useState, useEffect } from "react";
import Song from "../song/index";
import axios from "axios";
import Main from "../utils/main-content";
import shuffleIcon from "../../assets/shuffle.svg";
import SectionBar from "../utils/section-bar";
import songStyles from "../../styles/layout/song.module.scss";
import sectionBarSyles from "../../styles/layout/section-bar.module.scss";

const MySongs = () => {
	const [mySongs, setMySongs] = useState([]);
	const getMySongs = async () => {
		const res = await axios.get("/songs/my-songs");
		setMySongs(res.data);
	};

	useEffect(() => getMySongs(), []);

	return (
		<Main>
			<SectionBar>
				<h2 className={sectionBarSyles.sectionName}>My Songs</h2>
				<img src={shuffleIcon} alt="shufflePlay" className={sectionBarSyles.shufflePlay} />
			</SectionBar>

			<div className={`${songStyles.songsContainer}`}>
				{mySongs.map((mySong, index) => (
					<Song
						key={mySong.id}
						songName={mySong.songName}
						artist={mySong.artist}
						audio={mySong.audioUrl}
						image={mySong.imgUrl}
						index={index}
					/>
				))}
			</div>
		</Main>
	);
};

export default MySongs;
