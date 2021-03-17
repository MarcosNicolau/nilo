import { useEffect } from "react";
import { useSongContext } from "../index";

const Duration = ({ audio }) => {
	const { songInfo, setSongInfo } = useSongContext();

	const getAudioDuration = () => {
		const audioTag = document.createElement("audio");
		audioTag.src = audio;
		audioTag.onloadedmetadata = () => {
			const minutes = parseInt(audioTag.duration / 60, 10);
			let seconds = parseInt(audioTag.duration % 60);
			if (seconds < 10) seconds = `0${seconds}`;
			setSongInfo({ ...songInfo, duration: { minutes, seconds } });
			audioTag.remove();
		};
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getAudioDuration(), []);
	if (!songInfo.duration) return null;

	return (
		<p>
			{songInfo.duration.minutes}:{songInfo.duration.seconds}
		</p>
	);
};
export default Duration;
