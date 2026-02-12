const { connectToDatabase } = require('../../lib/db');
const { verifyToken } = require('../../lib/auth-helper');

module.exports = async function handler(req, res) {
    if (!verifyToken(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const db = await connectToDatabase();

    if (req.method === 'PUT') {
        const { key, data } = req.body;
        if (!key) return res.status(400).json({ error: 'Key required' });

        await db.collection('content').updateOne(
            { _id: key },
            { $set: { data } },
            { upsert: true }
        );
        res.status(200).json({ success: true });

    } else if (req.method === 'DELETE') {
        const { key } = req.body;
        if (!key) return res.status(400).json({ error: 'Key required' });

        await db.collection('content').deleteOne({ _id: key });
        res.status(200).json({ success: true });

    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
