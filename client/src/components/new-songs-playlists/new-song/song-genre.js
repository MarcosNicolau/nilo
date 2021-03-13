import formStyles from "../../../styles/layout/form.module.scss";
import newFormStyles from "../../../styles/layout/new-form.module.scss";

const SongGenreSelector = ({ value, handleChange }) => {
	return (
		<>
			<label htmlFor="genre" className={formStyles.label}>
				Select your song genre
			</label>
			<div className={newFormStyles.selectorContainer}>
				<select
					name="genre"
					className={newFormStyles.selector}
					value={value}
					onChange={handleChange}
				>
					<option value="pop">pop</option>
					<option value="rock">rock</option>
					<option value="indie">indie</option>
					<option value="techno">techno</option>
					<option value="instrumental">instrumental</option>
					<option value="cover">cover</option>
					<option value="reggaeton">reggaeton</option>
				</select>
			</div>
		</>
	);
};

export default SongGenreSelector;
