import { Link } from "react-router-dom";

import AuthCard from "../Auth/AuthCard";
import LoginForm from "../../components/Auth/LoginForm";

function Login() {

    return (
        <AuthCard
            title="Welcome back"
            subtitle="Sign in to manage your API keys and monitor your API traffic."
            footer={
                <>
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-blue-400 hover:text-blue-300"
                    >
                        Create account
                    </Link>
                </>
            }
        >
            <LoginForm />
        </AuthCard>
    );
}

export default Login;