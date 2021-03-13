import { Formik } from "formik";
import { Link } from "react-router-dom";
import authStyles from "../../styles/pages/auth.module.scss";
import errorIcon from "../../assets/error.svg";

const AuthForm = ({ authType, handleAuth, handleValidation, globalError }) => {
	return (
		<div className="background">
			<div className={authStyles.formContainer}>
				<h2>{authType === "login" ? "Login into Nilo" : "Join Nilo community"}</h2>
				<Formik
					initialValues={{
						username: "",
						password: "",
					}}
					onSubmit={async (values, { setErrors }) => {
						await handleAuth(values, setErrors);
					}}
					validate={async (values) => {
						const errors = {};
						handleValidation && (await handleValidation(values, errors));
						if (!values.username) errors.username = "Required";
						if (!values.password) errors.password = "Required";
						return errors;
					}}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit}>
							<label htmlFor="username">Username</label>
							<input
								type="text"
								name="username"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.username}
							/>
							<div className={authStyles.errors}>
								{errors.username && touched.username && (
									<p>
										<img src={errorIcon} alt="error" />
										{errors.username}
									</p>
								)}
							</div>
							<label htmlFor="username">Password</label>
							<input
								type="password"
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
							/>
							<div className={authStyles.errors}>
								{errors.password && touched.password && (
									<p>
										<img src={errorIcon} alt="error" />
										{errors.password}
									</p>
								)}
							</div>
							<button type="submit" disabled={isSubmitting} className="action-btn">
								{authType === "login" ? "log in" : "sign in"}
							</button>
							<div className={authStyles.errors}>
								{errors.global && (
									<p>
										<img src={errorIcon} alt="error" />
										{errors.global}
									</p>
								)}
							</div>
						</form>
					)}
				</Formik>
				<Link to={authType === "login" ? "/signin" : "/"} className={authStyles.changeForm}>
					{authType === "login" ? "Don't have an account?" : "Already have an account?"}
				</Link>
			</div>
		</div>
	);
};

export default AuthForm;
