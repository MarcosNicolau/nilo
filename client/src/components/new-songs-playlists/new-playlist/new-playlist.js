import { useNewPlaylistCtx } from "../context";

const NewPlaylist = () => {
	const { newPlaylist } = useNewPlaylistCtx();
	if (!newPlaylist) return null;
	return (
		<div>
			<h1>New Song</h1>
		</div>
	);
};

export default NewPlaylist;
