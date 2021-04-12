import Gallery from "../../utils/gallery/gallery";
import GalleryContent from "../../utils/gallery/gallery-content";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PopularPlaylists = () => {
	const [popularPlaylists, setPopularPlaylists] = useState("loading");
	useEffect(() => {
		const getRecentlyPlayed = async () => {
			const res = await axios.get("/galleries/popular-playlists");
			setPopularPlaylists(res.data);
		};
		getRecentlyPlayed();
	}, []);

	return (
		<Gallery name="Popular playlists">
			{popularPlaylists === "loading" ? (
				<h1>Loading...</h1>
			) : (
				popularPlaylists.map((playlist) => (
					<Link
						to={`/playlist/${playlist._id}`}
						key={playlist._id}
						style={{ textDecoration: "none", color: "unset" }}
					>
						<GalleryContent img={playlist.image} name={playlist.playlistName} />
					</Link>
				))
			)}
		</Gallery>
	);
};

export default PopularPlaylists;
