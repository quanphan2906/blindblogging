import React from "react";
import Button from "../common/Button";

function EmailAndPass({
    authState,
    handleChange,
    handleSubmit,
    error,
    capitalize,
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
            <div className="form-error"> {error.email} </div>
            <div className="form-grid">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={handleChange} />
            </div>
            <div className="form-error"> {error.password} </div>
            <div className="form-error"> {formMessage} </div>
            <Button color="red" action={capitalize(authState)} />
        </form>
    );
}

export default EmailAndPass;
