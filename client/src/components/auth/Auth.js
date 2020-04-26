import React from "react";
import Button from "../common/Button";
import coverImg from "../../assets/anete-lusina-zwsHjakE_iI-unsplash.jpg";
import { useState } from "react";
import Axios from "axios";
import endpoints from "../../api_config/endpoints";
import errorHandler from "../../api_config/errorHandler";

function Auth(props) {
    const authState = props.authState;

    const [auth, setAuth] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({
        email: "",
        password: "",
    });

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const handleChange = (e) => {
        setAuth({ ...auth, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auth.email) {
            setError({ ...error, email: "Please input your email" });
        }
        if (!auth.password) {
            setError({ ...error, password: "Please input your password" });
        } else {
            if (auth.password.length < 6) {
                setError({
                    ...error,
                    password: "Password must be at least 6 characters",
                });
            }
        }

        if (auth.email && auth.password && auth.password.length >= 6) {
            const authObj = { email: auth.email, password: auth.password };

            if (authState === "signup") {
                try {
                    const res = await Axios.post(
                        endpoints.REGISTER_USER(),
                        authObj
                    );
                    const {
                        data: { message },
                    } = res;
                    if (message === "success") {
                        props.history.push("/login");
                    }
                } catch (err) {
                    errorHandler(err);
                }
            }
            if (authState === "signin") {
                try {
                    const res = await Axios.post(
                        endpoints.LOGIN_USER(),
                        authObj
                    );
                    const {
                        data: { message, token, expiresIn },
                    } = res;
                    if (message === "success") {
                        const now = new Date();
                        const expiry = now.getTime() + expiresIn;
                        const tokenObj = { token, expiry };

                        localStorage.setItem(
                            "JWT token",
                            JSON.stringify(tokenObj)
                        );
                    }
                } catch (err) {
                    errorHandler(err);
                }
            }
        }
    };

    return (
        <main className="auth-wrapper">
            <div className="auth-container">
                <div className="cover-image-container">
                    <img src={coverImg} alt="" />
                </div>
                <div className="slogan">
                    <h1 className="text-align-center">
                        Welcome to BlindBlogging
                    </h1>
                    <p className="text-align-center">
                        At blindblogging, we make blogging accessible for the
                        visually impaired. Anyone can tell stories of
                        themselves.
                    </p>
                </div>
                <div className="oauth-button-container">
                    <Button
                        action={`${capitalize(authState)} with Google`}
                        color="orange"
                    />
                    <Button
                        action={`${capitalize(authState)} with Facebook`}
                        color="orange"
                    />
                </div>
                <form action="" className="auth-form" onSubmit={handleSubmit}>
                    {authState === "signup" ? (
                        <div>Or signup with email and password</div>
                    ) : (
                        <div>Or signin with email and password</div>
                    )}
                    <div className="form-grid">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-error"> {error.email} </div>
                    <div className="form-grid">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-error"> {error.password} </div>
                    <Button color="red" action={capitalize(authState)} />
                </form>
            </div>
        </main>
    );
}

export default Auth;
