const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

async function notifyTeam(data) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return;

    const typeMap = {
        repair: 'صيانة',
        trade_in: 'استبدال',
        device_request: 'طلب جهاز',
        laptop_sale: 'مبيعات',
        matchmaker: 'مطابقة',
        contact: 'تواصل',
        ticket: 'تذكرة'
    };

    const text = [
        '🔔 طلب جديد YAS CITY',
        `👤 ${data.name || 'عميل'}`,
        `📞 ${data.phone || '—'}`,
        `📂 ${typeMap[data.type] || data.type || 'عام'}`,
        `💻 ${data.device_type || data.device_name || '—'}`,
        `📝 ${data.fault || data.message || '—'}`,
        data.estimate ? `💰 ${data.estimate}` : ''
    ].filter(Boolean).join('\n');

    try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text })
        });
    } catch (e) {
        console.warn('Telegram notify failed:', e.message);
    }
}

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const inquiryData = req.body || {};

    const row = {
        name: inquiryData.name || 'عميل مجهول',
        phone: inquiryData.phone || null,
        device_type: inquiryData.device_type || inquiryData.device || inquiryData.device_name || null,
        fault: inquiryData.fault || null,
        estimate: inquiryData.estimate || null,
        quality: inquiryData.quality || null,
        usage_type: inquiryData.usage_type || inquiryData.usage || null,
        message: inquiryData.message || inquiryData.notes || null,
        type: inquiryData.type || 'general',
        status: inquiryData.status || 'new'
    };

    if (!supabase) {
        await notifyTeam(row);
        return res.status(200).json({ message: 'تم استلام الطلب (بدون قاعدة بيانات)', data: row });
    }

    try {
        const { data, error } = await supabase.from('inquiries').insert([row]).select();

        if (error) throw error;

        await notifyTeam({ ...row, ...inquiryData });

        return res.status(200).json({ message: 'تم استلام طلبك بنجاح', data });
    } catch (err) {
        console.error('Error saving inquiry:', err);
        await notifyTeam(row);
        return res.status(500).json({ error: 'حدث خطأ أثناء حفظ البيانات' });
    }
};
