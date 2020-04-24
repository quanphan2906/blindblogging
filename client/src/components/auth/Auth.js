import React from "react";
import Button from "../common/Button";
import coverImg from "../../assets/anete-lusina-zwsHjakE_iI-unsplash.jpg";
import { useState } from "react";
import axios from "axios";
import endpoints from "../../api_config/endpoints";

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

    const handleSubmit = (e) => {
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
                axios
                    .post(endpoints.REGISTER_USER(), authObj)
                    .then(({ data: { message } }) => {
                        if (message === "success") {
                            props.history.push("/login");
                        }
                    })
                    .catch(({ message, statusCode }) => {
                        console.log(statusCode + " " + message);
                    });
            }

            if (authState === "signin") {
                axios
                    .post(endpoints.LOGIN_USER(), authObj)
                    .then(({ message, token }) => {
                        if (message === "success") {
                            localStorage.setItem("JWT token", token);
                        }
                    })
                    .catch(({ message, statusCode }) => {
                        console.log(statusCode + " " + message);
                    });
            }
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <div className="cover-image-container">
                    <img src={coverImg} alt="" />
                </div>
                <div className="slogan">
                    <h3 className="text-align-center">
                        Welcome to BlindBlogging
                    </h3>
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
        </div>
    );
}

export default Auth;
