const { connectToDatabase } = require('../lib/db');

module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const db = await connectToDatabase();
        const docs = await db.collection('content').find({}).toArray();
        const result = {};
        docs.forEach(doc => {
            result[doc._id] = doc.data;
        });
        res.status(200).json(result);
    } catch (error) {
        console.error('DB error:', error);
        res.status(500).json({ error: 'Database error' });
    }
};
