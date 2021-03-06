import { useRef, useState } from "react";
import { useNewSongCtx } from "../context";
import { Formik } from "formik";
import closeIcon from "../../../assets/close.svg";
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
	const form = useRef();
	const closeNewSong = (e) => {
		if (e.target.classList.contains("background") || e.target.classList.contains("close")) {
			form.current.classList.add(newFormStyles.disappear);
			//Wait till animation finishes
			window.setTimeout(() => setNewSong((prev) => !prev), 250);
		}
	};
	if (!newSong) return null;
	return (
		<div
			className={`background ${newFormStyles.container} ${newFormStyles.appear}`}
			onClick={closeNewSong}
			ref={form}
		>
			<div className={formStyles.formContainer}>
				<h2 className={formStyles.formTitle}>Upload your song</h2>
				<Formik
					initialValues={{
						songName: "",
						genre: "pop",
					}}
					onSubmit={async (values, { setErrors }) => {
						if (!audioFile) return setErrors({ global: "Complete all the fields" });
						if (!imageFile) return setErrors({ global: "Complete all the fields" });
						const formData = new FormData();
						formData.append("audio", audioFile.file);
						formData.append("duration", JSON.stringify(audioFile.duration));
						formData.append("image", imageFile);
						formData.append("songName", values.songName);
						formData.append("genre", values.genre);

						setIsLoading(true);
						try {
							await axios.post("/create/new-song", formData);
							window.location.href = "/my-songs";
						} catch (err) {
							const res = err.response;
							if (res.status === 400) return setErrors({ global: res.data });
							if (res.status === 500) return setErrors({ global: res.data });
						}
					}}
					validate={(values) => {
						const errors = {};
						if (!values.songName) errors.songName = "Required";
						if (!values.genre) errors.genre = "Required";
						return errors;
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
						setErrors,
					}) => (
						<form
							onSubmit={handleSubmit}
							className={newFormStyles.form}
							encType="multipart-form-data"
						>
							<img src={closeIcon} alt="close" className="close" />
							<ImgInput value={values.image} setter={setImageFile} setErrors={setErrors} />
							<div className={newFormStyles.songInputContainer}>
								<label htmlFor="song-name" className={formStyles.label}>
									Song name
								</label>
								<input
									type="text"
									name="songName"
									className="input"
									value={values.name}
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								{errors.songName && touched.nasongNameme && <FormError error={errors.songName} />}

								<SongGenreSelector value={values.songGenre} handleChange={handleChange} />
								<AudioInput value={audioFile} setter={setAudioFile} setErrors={setErrors} />
								{errors.global && <FormError error={errors.global} style={{ margin: "2em 0 0" }} />}
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
