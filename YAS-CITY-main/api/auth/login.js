const { createClient } = require('@supabase/supabase-js');

// These should be set in Vercel/Environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ error: 'خطأ في بيانات الدخول: ' + error.message });
        }

        // Return a custom token or the session access token
        return res.status(200).json({ 
            message: 'Success', 
            token: data.session.access_token,
            user: {
                id: data.user.id,
                email: data.user.email
            }
        });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
