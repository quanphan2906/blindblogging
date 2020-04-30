const validateJwt = () => {
    const tokenString = localStorage.getItem("JWT token");
    if (!tokenString) return { token: null };

    const tokenObj = JSON.parse(tokenString);

    const now = new Date();
    if (now.getTime() > tokenObj.expiry) {
        localStorage.removeItem("JWT token");
        return { token: null };
    }

    return { token: tokenObj.token };
};

export default validateJwt;
