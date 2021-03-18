import { useSongContext } from "../index";

const Duration = () => {
	const { songInfo } = useSongContext();
	return (
		<p>
			{songInfo.duration.minutes}:{songInfo.duration.seconds}
		</p>
	);
};
export default Duration;
