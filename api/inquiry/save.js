const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const inquiryData = req.body;

    try {
        const { data, error } = await supabase
            .from('inquiries')
            .insert([
                {
                    name: inquiryData.name || 'عميل مجهول',
                    phone: inquiryData.phone,
                    device_type: inquiryData.device,
                    fault: inquiryData.fault,
                    estimate: inquiryData.estimate,
                    quality: inquiryData.quality,
                    usage_type: inquiryData.usage,
                    message: inquiryData.message,
                    type: inquiryData.type || 'general',
                    status: 'new'
                }
            ]);

        if (error) throw error;

        return res.status(200).json({ message: 'تم استلام طلبك بنجاح', data });
    } catch (err) {
        console.error('Error saving inquiry:', err);
        return res.status(500).json({ error: 'حدث خطأ أثناء حفظ البيانات' });
    }
};
