import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import endpoints from "../../api_config/endpoints";
import errorHandler from "../../api_config/errorHandler";
import EmailAndPass from "./EmailAndPass";
import OAuth from "./OAuth";
import Intro from "./Intro";
import { AuthContext } from "../../contexts/AuthContext";
import jwtDecode from "jwt-decode";
import jwtToStorage from "../../helpers/jwtToStorage";

function Auth(props) {
    const authState = props.authState;

    const {
        handleAuthChange,
        auth: authContext,
        handleTokenChange,
    } = useContext(AuthContext);

    const [auth, setAuth] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({
        email: "",
        password: "",
    });

    const [formMessage, setFormMessage] = useState("");

    useEffect(() => {
        if (authContext) {
            props.history.push("/blogs");
        }
    }, [authContext, props.history]);

    const handleChange = (e) => {
        setError({ email: "", password: "" });
        setFormMessage("");
        setAuth({ ...auth, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorTemp = { ...error };
        if (!auth.email) {
            errorTemp.email = "Please input your email";
        }
        if (!auth.password) {
            errorTemp.password = "Please input your password";
        } else {
            if (auth.password.length < 6) {
                errorTemp.password = "Password must be at least 6 characters";
            }
        }

        if (auth.email && auth.password && auth.password.length >= 6) {
            const authObj = { email: auth.email, password: auth.password };

            const handleSuccessAuth = async (token, expiresIn) => {
                jwtToStorage(token, expiresIn);

                const { userId } = jwtDecode(token);

                const res = await Axios.get(endpoints.GET_PROFILE_ID(userId));

                const {
                    data: { user },
                } = res;

                handleTokenChange(token);
                handleAuthChange(user);
            };

            if (authState === "signup") {
                try {
                    const res = await Axios.post(
                        endpoints.REGISTER_USER(),
                        authObj
                    );
                    const {
                        data: { message, token, expiresIn },
                    } = res;

                    if (message === "success") {
                        return handleSuccessAuth(token, expiresIn);
                    }

                    if (message === "existedEmail") {
                        return setFormMessage(
                            "This email has existed. Please choose another one or login"
                        );
                    }
                } catch (err) {
                    errorHandler(err);
                }

                setFormMessage("Signup fail. Please try again!");
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
                        return handleSuccessAuth(token, expiresIn);
                    }

                    if (message === "notRegistered") {
                        return setFormMessage(
                            "Your email is not recognized. Have you registered?"
                        );
                    }

                    if (message === "incorrectPassword") {
                        return setFormMessage("Incorrect password");
                    }
                } catch (err) {
                    errorHandler(err);
                }

                setFormMessage("Login fail. Please try again");
            }
        } else {
            setError(errorTemp);
        }
    };

    return (
        <main className="auth-wrapper">
            <div className="auth-container">
                <Intro />
                <OAuth authState={authState} />

                <EmailAndPass
                    authState={authState}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    error={error}
                    formMessage={formMessage}
                />
            </div>
        </main>
    );
}

export default Auth;
