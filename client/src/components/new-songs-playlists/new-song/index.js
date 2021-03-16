import { useState } from "react";
import { useNewSongCtx } from "../context";
import { Formik } from "formik";
import formStyles from "../../../styles/layout/form.module.scss";
import newFormStyles from "../../../styles/layout/new-form.module.scss";
import ImgInput from "../img-input";
import SongGenreSelector from "./song-genre";
import AudioInput from "./audio-input";
import FormError from "../../utils/form-error";
import axios from "axios";

const NewSong = () => {
	const { newSong, setNewSong } = useNewSongCtx();
	const [isLoading, setIsLoading] = useState(false);
	const [audioFile, setAudioFile] = useState(undefined);
	const [imageFile, setImageFile] = useState(undefined);
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
					}}
					onSubmit={async (values) => {
						const formData = new FormData();
						formData.append("audio", audioFile);
						formData.append("image", imageFile);
						formData.append("name", values.name);
						formData.append("genre", values.genre);

						setIsLoading(true);
						await axios.post("/create/new-song", formData);
						window.location.href = "/my-songs";
					}}
					validate={(values) => {
						const errors = {};
						if (!values.name) errors.name = "Required";
						if (!values.genre) errors.genre = "Required";
						if (!audioFile) errors.audio = "Required";
						if (!imageFile) errors.image = "Required";
						return errors;
					}}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form
							onSubmit={handleSubmit}
							className={newFormStyles.form}
							encType="multipart-form-data"
						>
							<ImgInput value={values.image} setter={setImageFile} image={imageFile} />
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
								disabled={(isSubmitting, isLoading)}
								className={`action-btn ${newFormStyles.submitBtn} ${
									isLoading && newFormStyles.isLoading
								}`}
							>
								{isLoading ? "Uploading..." : "Upload Song"}
							</button>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default NewSong;
