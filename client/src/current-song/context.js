import { createContext, useContext, useReducer } from "react";
import songReducer, { songState, SONG_ACTIONS } from "./reducer";

const CurrentSongContext = createContext("");
const useCurrentSongContext = () => useContext(CurrentSongContext);

const CurrentSongContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(songReducer, songState);

	return (
		<CurrentSongContext.Provider value={{ state, dispatch, actions: SONG_ACTIONS }}>
			{children}
		</CurrentSongContext.Provider>
	);
};

export default CurrentSongContextProvider;
export { useCurrentSongContext };
