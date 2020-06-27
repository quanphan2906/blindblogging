import React from "react";
import Button from "../common/Button";
import capitalize from "../../helpers/capitalize";

const EMAIL_PLACEHOLDER = "Please enter your email";
const PASSWORD_PLACEHOLDER = "Please enter your password";

function EmailAndPass({
    authState,
    handleChange,
    handleSubmit,
    error,
    formMessage,
}) {
    return (
        <form action="" className="auth-form" onSubmit={handleSubmit}>
            {authState === "signup" ? (
                <div>
                    <h2> Signup with email and password </h2>
                </div>
            ) : (
                <div>
                    <h2> Signin with email and password </h2>
                </div>
            )}
            <div className="form-grid">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    onChange={handleChange}
                    placeholder={EMAIL_PLACEHOLDER}
                />
            </div>
            <div className="form-error" role="alert">
                {error.email}
            </div>
            <div className="form-grid">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    onChange={handleChange}
                    placeholder={PASSWORD_PLACEHOLDER}
                />
            </div>
            <div className="form-error" role="alert">
                {error.password}
            </div>
            <div className="form-error" role="alert">
                {formMessage}
            </div>
            <Button color="red" action={capitalize(authState)} />
        </form>
    );
}

export default EmailAndPass;
