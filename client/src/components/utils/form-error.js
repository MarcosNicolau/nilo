import formStyles from "../../styles/layout/form.module.scss";
import errorIcon from "../../assets/error.svg";
const FormError = ({ error, style }) => {
	return (
		<div className={formStyles.errors}>
			<p style={style}>
				<img src={errorIcon} alt="error" />
				{error}
			</p>
		</div>
	);
};

export default FormError;
