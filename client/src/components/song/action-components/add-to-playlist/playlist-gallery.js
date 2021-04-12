import { useEffect, useState } from "react";
import { useSongContext } from "../../index";
import GalleryContent from "../../../utils/gallery/gallery-content";
import axios from "axios";

const PlaylistGallery = ({ setAddToPlaylist, playlist }) => {
	const [message, setMessage] = useState("");
	const { songInfo } = useSongContext();
	const [loading, setLoading] = useState(false);
	const source = axios.CancelToken.source();

	const addSong = async () => {
		if (loading) return;
		try {
			setLoading((prev) => !prev);
			await axios.post(
				"/playlist/add-song",
				{ songId: songInfo._id, playlistId: playlist._id },
				{ cancelToken: source.token }
			);
			setAddToPlaylist((prev) => !prev);
			setLoading((prev) => !prev);
		} catch (err) {
			const res = err.response;
			if (axios.isCancel(err)) return;
			if (res.status === 400) {
				setLoading((prev) => !prev);
				setMessage(res.data);
			}
		}
	};

	useEffect(() => {
		return () => source.cancel();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<GalleryContent
			action={addSong}
			img={playlist.image}
			imgStyle={{
				opacity: message && ".5",
			}}
			name={playlist.playlistName}
		>
			{message && <p>{message}</p>}
		</GalleryContent>
	);
};

export default PlaylistGallery;
