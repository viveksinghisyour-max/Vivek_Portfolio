const { Pool } = require('pg');

// Initialize database pool using connection string.
// Vercel Postgres provides POSTGRES_URL automatically.
// Supabase/Neon will provide DATABASE_URL if configured by user.
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

let pool;
if (connectionString) {
    pool = new Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

// Ensure the table exists when the handler is ready
async function ensureTableExists() {
    if (!pool) return;
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL,
                subject VARCHAR(200) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
    } catch (error) {
        console.error('Failed to ensure table exists:', error);
    }
}

// In serverless environments, we attempt to initialize this asynchronously.
ensureTableExists();

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

        if (!pool) {
            console.error('Database connection string is NOT configured.');
            return res.status(503).json({ error: 'Database service is currently unavailable. Please setup POSTGRES_URL.' });
        }

        // Parameterized query to prevent SQL Injection
        const queryText = `
            INSERT INTO contact_messages (name, email, subject, message)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `;
        
        await pool.query(queryText, [name, email, subject, message]);

        return res.status(200).json({ success: true, message: 'Message securely saved.' });
    } catch (error) {
        console.error('Database insertion error:', error);
        return res.status(500).json({ error: 'Internal server error while processing request.' });
    }
}
