const tokenService = require("../services/token.service");

module.exports = (request, response, next) => {
    if (request.method === "OPTIONS") {
        return next();
    }

    try {
        //формат Bearer xxxxxxxxxxxxyyyyyyyxyxyxyxyxy
        const token = request.headers.authorization.split(" ")[1];
        if (!token) {
            return response.status(401).json({ message: "Unauthorized user" });
        }

        const data = tokenService.validateAccess(token);

        request.user = data;

        next();
    } catch (error) {
        response.status(401).json({ message: "Unauthorized user" });
    }
};
