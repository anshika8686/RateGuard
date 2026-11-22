import { useState } from "react";

import InputField from "../common/InputField";
import Button from "../common/Button";

function LoginForm() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Login Data:", formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
            />

            <Button type="submit">
                Sign In
            </Button>

        </form>
    );
}

export default LoginForm;