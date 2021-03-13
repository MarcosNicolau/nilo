import AuthForm from "./auth";
import axios from "axios";

const SignIn = () => {
	const handleAuth = async (values) => {
		console.log(values);
		try {
			await axios.post("/auth/sign-in", { username: values.username, password: values.password });
			window.location.href = "/";
		} catch (err) {
			console.log(err);
		}
	};
	return <AuthForm authType={"sign-in"} handleAuth={handleAuth} />;
};

export default SignIn;
