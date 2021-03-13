import { createContext, useState, useContext } from "react";

const NewSongCtx = createContext(false);
const NewPlaylistCtx = createContext(false);
export const useNewSongCtx = () => useContext(NewSongCtx);
export const useNewPlaylistCtx = () => useContext(NewPlaylistCtx);

const NewSongPlaylistCtxProvider = ({ children }) => {
	const [newSong, setNewSong] = useState(false);
	const [newPlaylist, setNewPlaylist] = useState(false);
	return (
		<NewSongCtx.Provider value={{ newSong, setNewSong }}>
			<NewPlaylistCtx.Provider value={{ newPlaylist, setNewPlaylist }}>
				{children}
			</NewPlaylistCtx.Provider>
		</NewSongCtx.Provider>
	);
};

export default NewSongPlaylistCtxProvider;
