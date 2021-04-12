import { Link } from "react-router-dom";
import { usePlaylistsContext } from "../playlist/context";
import navStyles from "../../styles/layout/nav.module.scss";

const Playlists = ({ selectedSection, setSelectedSection }) => {
	const { playlists } = usePlaylistsContext();
	if (playlists === "loading") return <p>Loading...</p>;
	if (!playlists.length) return null;
	return (
		<>
			{playlists.map((playlist) => (
				<PlaylistLink
					key={playlist._id}
					name={playlist.playlistName}
					id={playlist._id}
					setSelectedSection={setSelectedSection}
					selectedSection={selectedSection}
				/>
			))}
		</>
	);
};

const PlaylistLink = ({ selectedSection, setSelectedSection, name, id }) => {
	const link = `/playlist/${id}`;
	return (
		<Link
			className={selectedSection === link ? navStyles.activeLink : ""}
			to={link}
			onClick={() => setSelectedSection(link)}
		>
			{name}
		</Link>
	);
};

export default Playlists;
