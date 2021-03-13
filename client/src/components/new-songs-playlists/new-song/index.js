import { useState } from "react";
import { useNewSongCtx } from "../context";
import { Formik } from "formik";
import formStyles from "../../../styles/layout/form.module.scss";
import newFormStyles from "../../../styles/layout/new-form.module.scss";
import ImgInput from "../img-input";
import SongGenreSelector from "./song-genre";
import AudioInput from "./audio-input";
import FormError from "../../utils/form-error";

const NewSong = () => {
	const { newSong, setNewSong } = useNewSongCtx();
	const [audioFile, setAudioFile] = useState(undefined);
	if (!newSong) return null;

	const closeNewSong = (e) => {
		if (e.target.classList.contains("background") || e.target.classList.contains("close"))
			return setNewSong((prev) => !prev);
	};

	return (
		<div className={`background ${newFormStyles.container}`} onClick={closeNewSong}>
			<div className={formStyles.formContainer}>
				<h2 className={formStyles.formTitle}>Upload your song</h2>
				<Formik
					initialValues={{
						name: "",
						genre: "pop",
						image: "",
					}}
					validate={(values) => {
						const errors = {};
						if (!values.name) errors.name = "Required";
						if (!values.genre) errors.genre = "Required";
						if (!values.image) errors.image = "Required";
						if (!values.audio) errors.audio = "Required";
						if (!audioFile) errors.audio = "Required";
						return errors;
					}}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit} className={newFormStyles.form}>
							<ImgInput value={values.image} handleChange={handleChange} handleBlur={handleBlur} />
							<div className={newFormStyles.songInputContainer}>
								<label htmlFor="song-name" className={formStyles.label}>
									Song name
								</label>
								<input
									type="text"
									name="name"
									className="input"
									value={values.name}
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								{errors.name && touched.name && <FormError error={errors.name} />}

								<SongGenreSelector value={values.songGenre} handleChange={handleChange} />
								<AudioInput value={audioFile} setter={setAudioFile} />
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className={`action-btn ${newFormStyles.submitBtn}`}
							>
								Upload Song
							</button>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default NewSong;
