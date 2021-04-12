import Gallery from "../../utils/gallery/gallery";
import GalleryContent from "../../utils/gallery/gallery-content";
import galleryStyles from "../../../styles/layout/gallery.module.scss";
import playImg from "../../../assets/controls/play.svg";
import { useCurrentSongContext } from "../../../current-song/context";
import { useEffect, useState } from "react";
import axios from "axios";

const RecentlyPlayed = () => {
	const [recentlyPlayed, setRecentlyPlayed] = useState("loading");
	const { dispatch, actions } = useCurrentSongContext();

	useEffect(() => {
		const getRecentlyPlayed = async () => {
			const res = await axios.get("/galleries/recently-played");
			setRecentlyPlayed(res.data);
		};
		getRecentlyPlayed();
	}, []);

	return (
		<Gallery name="Recently played">
			{recentlyPlayed === "loading" ? (
				<h1>Loading...</h1>
			) : (
				recentlyPlayed.map((song) => {
					const playSong = () => dispatch({ type: actions.CHANGE_SONG, payload: song });
					return (
						<GalleryContent img={song.image} name={song.songName} key={song._id} action={playSong}>
							<div className={galleryStyles.playImg}>
								<img src={playImg} alt="play" style={{ height: "5em" }} />
							</div>
						</GalleryContent>
					);
				})
			)}
		</Gallery>
	);
};

export default RecentlyPlayed;
