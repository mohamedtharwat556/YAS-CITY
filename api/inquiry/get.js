const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    // Basic Auth Check (Simple version for demo, improved in production)
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { data, error } = await supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching inquiries:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
