import AuthForm from "./auth";
import axios from "axios";

const Login = () => {
	const handleAuth = async () => {
		try {
			await axios.get("/auth/sign-in");
		} catch (err) {
			console.log(err);
		}
	};

	return <AuthForm authType={"login"} handleAuth={handleAuth} />;
};

export default Login;
