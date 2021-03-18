import { useState, useEffect } from "react";
import { useCurrentSongContext } from "../../../current-song/context";

const Duration = () => {
	const { state } = useCurrentSongContext();
	const [currentTime, setCurrentTime] = useState(state.currentTime);

	const parseSongCurrentTime = (currentTime) => {
		const minutes = parseInt(currentTime / 60, 10);
		let seconds = parseInt(currentTime % 60);
		if (seconds < 10) seconds = `0${seconds}`;
		setCurrentTime({ minutes, seconds });
	};

	useEffect(() => parseSongCurrentTime(state.currentTime), [state.currentTime]);
	if (!state.audio) return null;
	if (!state.currentTime) return <p>{`0:00`}</p>;
	return (
		<>
			<p>{`${currentTime.minutes}:${currentTime.seconds}`}</p>
		</>
	);
};

export default Duration;
