import { useState } from "react";
import { useNewPlaylistCtx } from "../context";
import { Formik } from "formik";
import formStyles from "../../../styles/layout/form.module.scss";
import newFormStyles from "../../../styles/layout/new-form.module.scss";
import ImgInput from "../img-input";
import FormError from "../../utils/form-error";
import axios from "axios";

const NewPlaylist = () => {
	const { newPlaylist, setNewPlaylist } = useNewPlaylistCtx();
	const [isLoading, setIsLoading] = useState(false);
	const [imageFile, setImageFile] = useState(undefined);
	const closeNewSong = (e) => {
		if (e.target.classList.contains("background") || e.target.classList.contains("close"))
			return setNewPlaylist((prev) => !prev);
	};
	return (
		<div
			className={`background ${newFormStyles.container} ${
				newPlaylist ? newFormStyles.appear : newFormStyles.disappear
			}`}
			onClick={closeNewSong}
		>
			<div className={formStyles.formContainer}>
				<h2 className={formStyles.formTitle}>Create a new playlist</h2>
				<Formik
					initialValues={{
						name: "",
						description: "",
					}}
					validate={(values) => {
						console.log(values);
						const errors = {};
						if (!values.name) errors.name = "Required";
						if (!values.description) errors.description = "Required";
						return errors;
					}}
					onSubmit={async (values, { setErrors }) => {
						if (!imageFile) return setErrors({ global: "Complete all the fields" });
						const formData = new FormData();
						formData.append("image", imageFile);
						formData.append("name", values.name);
						formData.append("genre", values.genre);

						setIsLoading(true);
						try {
							await axios.post("/create/new-playlist", formData);
							window.location.href = "/";
						} catch (err) {
							const res = err.response;
							if (res.status === 400) return setErrors({ global: res.data });
							if (res.status === 500) return setErrors({ global: res.data });
						}
					}}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit} className={newFormStyles.form}>
							<ImgInput
								value={values.image}
								handleChange={handleChange}
								handleBlur={handleBlur}
								setter={setImageFile}
							/>
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
								<label htmlFor="description" className={formStyles.label}>
									Playlist description
								</label>
								<textarea
									name="description"
									value={values.description}
									cols="30"
									rows="6"
									onBlur={handleBlur}
									onChange={handleChange}
									className={`input ${newFormStyles.textarea}`}
								></textarea>
								{errors.description && touched.description && (
									<FormError error={errors.description} />
								)}
								{errors.global && <FormError error={errors.global} style={{ margin: "2em 0 0" }} />}
							</div>

							<button
								type="submit"
								disabled={(isSubmitting, isLoading)}
								className={`action-btn ${newFormStyles.submitBtn} ${
									isLoading && newFormStyles.isLoading
								}`}
							>
								{isLoading ? "Creating..." : "Create playlist"}
							</button>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default NewPlaylist;
