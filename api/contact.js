import { Pool } from 'pg';

let pool;

// Cache the connection pool across warm invocations
function getPool() {
    if (!pool) {
        const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
        if (connectionString) {
            pool = new Pool({
                connectionString,
                ssl: {
                    rejectUnauthorized: false
                }
            });
        }
    }
    return pool;
}

let tableEnsured = false;

// Ensure the table exists synchronously within the handler lifecycle
async function ensureTableExists(dbPool) {
    if (tableEnsured) return;
    try {
        await dbPool.query(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL,
                subject VARCHAR(200) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        tableEnsured = true;
    } catch (error) {
        console.error('Failed to ensure table exists:', error);
        throw error;
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, subject, message } = req.body;

        // Basic backend validation checks and sanitization
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        if (name.length > 100 || email.length > 150 || subject.length > 200 || message.length > 2000) {
            return res.status(400).json({ error: 'Input exceeded maximum character limits.' });
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address.' });
        }

        const currentPool = getPool();
        if (!currentPool) {
            console.error('Database connection string is NOT configured.');
            return res.status(503).json({ error: 'Database service is currently unavailable. Please setup POSTGRES_URL or DATABASE_URL.' });
        }

        // Make sure table exists before inserting
        await ensureTableExists(currentPool);

        // Parameterized query to prevent SQL Injection
        const queryText = `
            INSERT INTO contact_messages (name, email, subject, message)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `;
        
        await currentPool.query(queryText, [name, email, subject, message]);

        return res.status(200).json({ success: true, message: 'Message securely saved.' });
    } catch (error) {
        console.error('Database insertion error:', error.message || error);
        return res.status(500).json({ error: 'Internal server error while processing request.' });
    }
}
