import { Formik } from "formik";
import { Link } from "react-router-dom";
import authStyles from "../../styles/pages/auth.module.scss";

const AuthForm = ({ authType, handleAuth }) => {
	return (
		<div className={authStyles.formContainer}>
			<h2>{authType === "login" ? "Login into Nilo" : "Join Nilo community"}</h2>
			<Formik
				initialValues={{
					username: "",
					password: "",
				}}
				onSubmit={async (values) => {
					handleAuth(values);
				}}
				validate={(values) => {
					const errors = {};
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
						<p className={authStyles.errors}>
							{errors.username && touched.username && errors.username}
						</p>

						<label htmlFor="username">Password</label>
						<input
							type="password"
							name="password"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
						/>
						<p className={authStyles.errors}>
							{errors.password && touched.password && errors.password}
						</p>

						<button type="submit" disabled={isSubmitting} className="action-btn">
							{authType === "login" ? "log in" : "sign in"}
						</button>
					</form>
				)}
			</Formik>
			<Link to={authType === "login" ? "/signin" : "/"} className={authStyles.changeForm}>
				{authType === "login" ? "Don't have an account?" : "Already have an account?"}
			</Link>
		</div>
	);
};

export default AuthForm;
