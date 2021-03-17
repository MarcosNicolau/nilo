const songState = {
	songName: "",
	artist: "",
	duration: "",
	currentTime: "",
	image: "",
	audio: "",
};

const SONG_ACTIONS = {
	PLAY_SONG: "play-song",
	CHANGE_SONG: "change-song",
	SET_CURRENT_TIME: "set-current-time",
	CHANGE_CURRENT_TIME: "change-current-time",
};

const songReducer = (state, action) => {
	switch (action.type) {
		case SONG_ACTIONS.PLAY_SONG:
			return state.audio.play();
		case SONG_ACTIONS.CHANGE_SONG:
			return changeSong(state, action.payload);
		case SONG_ACTIONS.SET_CURRENT_TIME:
			return { ...state, currentTime: action.payload };
		default:
			return new Error("Song action doesnt exist");
	}
};

function changeSong(state, payload) {
	const { songName, artist, duration, audio, image } = payload;
	return {
		...state,
		songName,
		artist,
		duration,
		image,
		audio,
	};
}

export default songReducer;
export { songState, SONG_ACTIONS };
