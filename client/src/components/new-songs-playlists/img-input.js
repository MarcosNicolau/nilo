import { useState } from "react";
import fileReader from "../../utils/file-reader";
import imgInputStyles from "../../styles/components/img-input.module.scss";
import musicIcon from "../../assets/music.svg";
import FormError from "../utils/form-error";

const ImgInput = ({ value, error }) => {
	const [selectedSongImg, setSelectedSongImg] = useState(undefined);

	const handleImgChange = async (e) => {
		const file = e.target.files[0];
		fileReader(file, setSelectedSongImg);
	};
	return (
		<>
			<label htmlFor="file" className={imgInputStyles.inputFile}>
				<div className={imgInputStyles.chooseImg}>
					<img src={selectedSongImg ? selectedSongImg : musicIcon} alt="music" />
					{selectedSongImg ? null : <p>Choose image</p>}
				</div>
				<input
					className={imgInputStyles.imgInput}
					type="file"
					name="image"
					value={value}
					accept="image/*"
					onChange={handleImgChange}
				/>
				{error && <FormError error={error} />}
			</label>
		</>
	);
};

export default ImgInput;
