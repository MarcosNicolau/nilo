import audioInputStyles from "../../../styles/components/audio-input.module.scss";
import musicIcon from "../../../assets/music.svg";

const AudioInput = ({ value, setter }) => {
	const handleAudioChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setter(file);
	};

	// const getAudioDuration = (file, name) => {
	// 	const audio = document.createElement("audio");
	// 	audio.src = file;
	// 	audio.onloadedmetadata = () => {
	// 		const minutes = parseInt(audio.duration / 60, 10);
	// 		const seconds = parseInt(audio.duration % 60);
	// 		setter({ file: file, name: name, duration: { minutes, seconds } });
	// 	};
	// };

	return (
		<>
			<label htmlFor="file" className={audioInputStyles.inputFile}>
				<div className={audioInputStyles.chooseAudio}>
					<img src={musicIcon} alt="music" />
					{value ? <p>{value.name}</p> : <p>Select your song</p>}
				</div>
				<input
					type="file"
					name="audio"
					accept="audio/*"
					onChange={handleAudioChange}
					className={audioInputStyles.audioInput}
				/>
			</label>
		</>
	);
};

export default AudioInput;
