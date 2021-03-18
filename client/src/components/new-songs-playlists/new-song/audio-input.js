import audioInputStyles from "../../../styles/components/audio-input.module.scss";
import musicIcon from "../../../assets/music.svg";

const AudioInput = ({ value, setter, setErrors }) => {
	const handleAudioChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		if (file.size > 1 * 5e8) return setErrors({ global: "File too large" });
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			getAudioDuration(reader.result, file);
		};
	};
	const getAudioDuration = (audio, file) => {
		const audioTag = document.createElement("audio");
		audioTag.src = audio;
		audioTag.onloadedmetadata = () => {
			const minutes = parseInt(audioTag.duration / 60, 10);
			let seconds = parseInt(audioTag.duration % 60);
			if (seconds < 10) seconds = `0${seconds}`;
			setter({ file, duration: { minutes, seconds } });
			audioTag.remove();
		};
	};

	return (
		<>
			<label htmlFor="file" className={audioInputStyles.inputFile}>
				<div className={audioInputStyles.chooseAudio}>
					<img src={musicIcon} alt="music" />
					{value ? <p>{value.file.name}</p> : <p>Select your song</p>}
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
