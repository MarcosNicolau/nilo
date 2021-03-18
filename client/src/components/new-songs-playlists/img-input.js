import fileReader from "../../utils/file-reader";
import { useState } from "react";
import imgInputStyles from "../../styles/components/img-input.module.scss";
import musicIcon from "../../assets/music.svg";
import FormError from "../utils/form-error";

const ImgInput = ({ error, setter, setErrors }) => {
	const [imageBynary, setImageBynary] = useState(undefined);
	const handleImgChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		if (file.size > 1 * 1e7) return setErrors({ global: "File too large" });
		await fileReader(file, setImageBynary);
		setter(file);
	};
	return (
		<>
			<label htmlFor="file" className={imgInputStyles.inputFile}>
				<div className={imgInputStyles.chooseImg}>
					<img src={imageBynary ? imageBynary : musicIcon} alt="music" />
					{imageBynary ? null : <p>Choose image</p>}
				</div>
				<input
					className={imgInputStyles.imgInput}
					type="file"
					name="image"
					accept="image/*"
					onChange={handleImgChange}
				/>
				{error && <FormError error={error} />}
			</label>
		</>
	);
};

export default ImgInput;
