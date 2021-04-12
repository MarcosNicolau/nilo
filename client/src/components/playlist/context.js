import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const PlaylistsContext = createContext("");
const usePlaylistsContext = () => useContext(PlaylistsContext);

const PlaylistsContextProvider = ({ children }) => {
	const [playlists, setPlaylists] = useState("loading");

	const getUserPlaylists = async () => {
		const res = await axios.get("/playlist");
		setPlaylists(res.data);
	};
	useEffect(() => getUserPlaylists(), []);

	return (
		<PlaylistsContext.Provider value={{ playlists, setPlaylists }}>
			{children}
		</PlaylistsContext.Provider>
	);
};

export default PlaylistsContextProvider;
export { usePlaylistsContext };
