import audioInputStyles from "../../../styles/components/audio-input.module.scss";
import musicIcon from "../../../assets/music.svg";

const AudioInput = ({ value, setter }) => {
	return (
		<label htmlFor="file" className={audioInputStyles.inputFile}>
			<div className={audioInputStyles.chooseAudio}>
				<img src={musicIcon} alt="music" />
				{value ? <p>{value.name}</p> : <p>Select your song</p>}
			</div>
			<input
				type="file"
				name="audio"
				accept="audio/*"
				onChange={(e) => setter(e.target.files[0])}
				className={audioInputStyles.audioInput}
			/>
		</label>
	);
};

export default AudioInput;
