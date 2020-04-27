const jwt = require("jsonwebtoken");
const config = require("../config/config");

const signJwt = (email, userId) => {
    const expiresIn = 3; //in terms of hours
    const expiresInString = expiresIn.toString() + "h";

    const token = jwt.sign({ email, userId }, config.JWT_SECRET, {
        expiresIn: expiresInString,
    });

    const expiredInMilisec = expiresIn * 3600000;
    return { token, expiredInMilisec };
};

module.exports = signJwt;
