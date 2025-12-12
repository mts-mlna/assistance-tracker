const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.json({ user: null });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.json({ user: null });
    }
}

module.exports = verificarToken;
