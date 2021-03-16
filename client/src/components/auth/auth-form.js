import { Formik } from "formik";
import { Link } from "react-router-dom";
import formStyles from "../../styles/layout/form.module.scss";
import FormError from "../utils/form-error";

const AuthForm = ({ authType, handleAuth, handleValidation }) => {
	return (
		<div className="background">
			<div className={formStyles.formContainer}>
				<h2 className={formStyles.formTitle}>
					{authType === "login" ? "Login into Nilo" : "Join Nilo community"}
				</h2>
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
						<form onSubmit={handleSubmit} className={formStyles.form}>
							<label htmlFor="username" className={formStyles.label}>
								Username
							</label>
							<input
								className="input"
								type="text"
								name="username"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.username}
							/>
							{errors.username && touched.username && <FormError error={errors.username} />}
							<label htmlFor="username" className={formStyles.label}>
								Password
							</label>
							<input
								className="input"
								type="password"
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
							/>
							{errors.password && touched.password && <FormError error={errors.password} />}

							<button type="submit" disabled={isSubmitting} className="action-btn">
								{authType === "login" ? "log in" : "sign in"}
							</button>
							{errors.global && touched.global && <FormError error={errors.global} />}
						</form>
					)}
				</Formik>
				<Link to={authType === "login" ? "/signin" : "/"} className={formStyles.changeForm}>
					{authType === "login" ? "Don't have an account?" : "Already have an account?"}
				</Link>
			</div>
		</div>
	);
};

export default AuthForm;
