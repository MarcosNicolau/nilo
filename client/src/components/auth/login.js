import AuthForm from "./auth-form";
import axios from "axios";

const Login = () => {
	const handleAuth = async (values, setErrors) => {
		try {
			await axios.post("/auth/login", {
				username: values.username,
				password: values.password,
			});
			window.location.href = "/";
		} catch (err) {
			const res = err.response;
			if (res.status === 400) return setErrors({ global: res.data });
		}
	};

	return <AuthForm authType={"login"} handleAuth={handleAuth} />;
};

export default Login;
