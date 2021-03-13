import AuthForm from "./auth-form";
import axios from "axios";

const SignIn = () => {
	const handleAuth = async (values, setError) => {
		try {
			await axios.post("/auth/sign-in", { username: values.username, password: values.password });
			window.location.href = "/";
		} catch (err) {
			const res = err.response;
			if (res.status === 400) return setError({ global: res.data });
		}
	};

	const handleValidation = async (values, errors) => {
		const res = await axios.post("/auth/check-username-availability", {
			username: values.username,
		});
		if (res.data) errors.username = res.data;
	};
	return (
		<AuthForm authType={"sign-in"} handleAuth={handleAuth} handleValidation={handleValidation} />
	);
};

export default SignIn;
