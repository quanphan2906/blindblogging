import React from "react";
import Button from "../common/Button";
import capitalize from "../../helpers/capitalize";

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
                <div>Or signup with email and password</div>
            ) : (
                <div>Or signin with email and password</div>
            )}
            <div className="form-grid">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={handleChange} />
            </div>
            <div className="form-error" role="alert">
                {error.email}
            </div>
            <div className="form-grid">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={handleChange} />
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
