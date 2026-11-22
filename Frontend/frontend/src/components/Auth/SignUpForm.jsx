import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

function SignupForm() {
    const navigate=useNavigate()
    const { signup, loading } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setError("");
    };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (
        !formData.username.trim() ||
        !formData.email.trim() ||
        !formData.password ||
        !formData.confirmPassword
    ) {
        setError("All fields are required.");
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    setError("");

    const result = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password
    });

    if (!result.success) {
        setError(result.message);
        return;
    }

    navigate("/dashboard")

    console.log("Signup successful:", result.data);
  };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
        <span>⚠</span>
        <p>{error}</p>
        </div>
)}

            <InputField
                label="Username"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
            />

            <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
            />

            <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
            />

            <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />

            <Button type="submit" loading={loading}>
                Create Account
            </Button>

        </form>
    );
}

export default SignupForm;