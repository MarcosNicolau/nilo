import formStyles from "../../styles/layout/form.module.scss";
import errorIcon from "../../assets/error.svg";
const FormError = ({ error }) => {
	return (
		<div className={formStyles.errors}>
			<p>
				<img src={errorIcon} alt="error" />
				{error}
			</p>
		</div>
	);
};

export default FormError;
