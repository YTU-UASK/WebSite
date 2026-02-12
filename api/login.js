const { generateToken } = require('../lib/auth-helper');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = generateToken();
        res.status(200).json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};
