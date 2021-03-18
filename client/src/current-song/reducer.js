const songState = {
	songName: "",
	artist: "",
	duration: "",
	currentTime: "",
	image: "",
	audio: "",
	paused: false,
	index: "",
	playlist: "",
	isShufflePlay: false,
};

const SONG_ACTIONS = {
	CHANGE_SONG: "change-song",
	SET_CURRENT_TIME: "set-current-time",
	CHANGE_CURRENT_TIME: "change-current-time",
	PLAY_PAUSE_SONG: "play-pause-song",
	NEXT_BACK_SONG: "next-back-song",
	SHUFFLE_PLAY: "shuffle-play",
};

const songReducer = (state, action) => {
	switch (action.type) {
		case SONG_ACTIONS.PLAY_SONG:
			return state.audio.play();
		case SONG_ACTIONS.CHANGE_SONG:
			return changeSong(state, action.payload);
		case SONG_ACTIONS.NEXT_BACK_SONG:
			return nextBackSong(state, action.payload);
		case SONG_ACTIONS.SET_CURRENT_TIME:
			return { ...state, currentTime: action.payload };
		case SONG_ACTIONS.PLAY_PAUSE_SONG:
			return { ...state, paused: !state.paused };
		case SONG_ACTIONS.SHUFFLE_PLAY:
			return shufflePlay(state, action.payload);
		default:
			return new Error("Song action doesnt exist");
	}
};

function changeSong(state, payload) {
	const { songName, artist, duration, image, audio, index, playlist } = payload;
	return {
		...state,
		songName,
		artist,
		duration,
		image,
		audio,
		paused: false,
		index,
		playlist,
		isShufflePlay: false,
	};
}

function nextBackSong(state, payload) {
	if (!state.playlist[payload]) return { ...state };
	const { songName, artist, duration, image, audio, index } = state.playlist[payload];
	return {
		...state,
		songName,
		artist,
		duration,
		image,
		audio,
		paused: false,
		index,
	};
}

function shufflePlay(state, payload) {
	const playlist = state.playlist || payload;
	const randomNumber = getRandomNumber(playlist.length - 1, state.index);
	const { songName, artist, duration, image, audio, index } = playlist[randomNumber];
	return {
		...state,
		songName,
		artist,
		duration,
		image,
		audio,
		paused: false,
		index,
		playlist,
		isShufflePlay: true,
	};
}

function getRandomNumber(max, index) {
	let randomNumber = Math.round(Math.random() * (max - 0) + 0);
	while (randomNumber === index) {
		randomNumber = Math.round(Math.random() * (max - 0) + 0);
	}
	return randomNumber;
}

export default songReducer;
export { songState, SONG_ACTIONS };
