const jwtToStorage = (token, expiresIn) => {
    const now = new Date();
    const expiry = now.getTime() + expiresIn;
    const tokenObj = { token, expiry };

    localStorage.setItem("JWT token", JSON.stringify(tokenObj));
};

export default jwtToStorage;
