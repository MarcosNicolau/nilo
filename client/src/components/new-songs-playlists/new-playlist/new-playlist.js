import { useNewPlaylistCtx } from "../context";
import { Formik } from "formik";
import formStyles from "../../../styles/layout/form.module.scss";
import newFormStyles from "../../../styles/layout/new-form.module.scss";
import ImgInput from "../img-input";
import FormError from "../../utils/form-error";

const NewPlaylist = () => {
	const { newPlaylist, setNewPlaylist } = useNewPlaylistCtx();
	const closeNewSong = (e) => {
		if (e.target.classList.contains("background") || e.target.classList.contains("close"))
			return setNewPlaylist((prev) => !prev);
	};
	if (!newPlaylist) return null;
	return (
		<div className={`background ${newFormStyles.container}`} onClick={closeNewSong}>
			<div className={formStyles.formContainer}>
				<h2 className={formStyles.formTitle}>Create a new playlist</h2>
				<Formik
					initialValues={{
						name: "",
					}}
					validate={(values) => {
						const errors = {};
						if (!values.name) errors.name = "Required";
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
								<label htmlFor="desc" className={formStyles.label}>
									Playlist description
								</label>
								<textarea
									name="desc"
									id=""
									cols="30"
									rows="6"
									className={`input ${newFormStyles.textarea}`}
								></textarea>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className={`action-btn ${newFormStyles.submitBtn}`}
							>
								Create Playlist
							</button>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default NewPlaylist;
