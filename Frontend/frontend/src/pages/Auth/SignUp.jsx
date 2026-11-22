import { Link } from "react-router-dom";


import SignupForm from "../../components/Auth/SignUpForm";
import AuthCard from "./AuthCard";


function Signup() {
    return (
        <AuthCard
            title="Create your account"
            subtitle="Get started with RateGuard and manage your API keys with ease."
            footer={
                <>
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="font-medium text-blue-400 hover:text-blue-300"
                    >
                        Sign in
                    </Link>
                </>
            }
        >
            <SignupForm />
        </AuthCard>
    );
}

export default Signup;