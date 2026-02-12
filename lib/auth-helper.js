const jwt = require('jsonwebtoken');

function generateToken() {
    return jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

function verifyToken(req) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return false;
    try {
        jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

module.exports = { generateToken, verifyToken };
