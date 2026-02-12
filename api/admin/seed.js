const { connectToDatabase } = require('../../lib/db');
const { verifyToken } = require('../../lib/auth-helper');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!verifyToken(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { defaults } = req.body;
        const db = await connectToDatabase();

        const ops = Object.entries(defaults).map(([key, data]) => ({
            updateOne: {
                filter: { _id: key },
                update: { $set: { data } },
                upsert: true
            }
        }));

        await db.collection('content').bulkWrite(ops);
        res.status(200).json({ success: true, count: ops.length });
    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ error: 'Seed failed' });
    }
};
