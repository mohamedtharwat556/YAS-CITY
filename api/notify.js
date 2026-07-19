// Server-side team notifications (Telegram)
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        return res.status(200).json({ ok: false, message: 'Notifications not configured' });
    }

    const data = req.body || {};
    const typeMap = {
        repair: 'صيانة',
        trade_in: 'استبدال (Trade-in)',
        device_request: 'طلب جهاز',
        laptop_sale: 'مبيعات',
        matchmaker: 'مطابقة أجهزة',
        contact: 'تواصل',
        ticket: 'تذكرة دعم'
    };

    const typeLabel = typeMap[data.type] || 'طلب جديد';
    const detail = data.fault || data.message || data.device_name || data.device_type || '—';

    const text = [
        '🔔 *طلب جديد — YAS CITY*',
        `👤 ${data.name || 'عميل'}`,
        `📞 ${data.phone || 'غير مسجل'}`,
        `📂 ${typeLabel}`,
        `💻 ${data.device_type || data.device_name || '—'}`,
        `📝 ${detail}`,
        data.estimate ? `💰 ${data.estimate}` : ''
    ].filter(Boolean).join('\n');

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: 'Markdown'
            })
        });

        const result = await response.json();
        if (!result.ok) {
            return res.status(502).json({ error: 'Telegram API error', details: result });
        }

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Notify error:', err);
        return res.status(500).json({ error: 'Notification failed' });
    }
};
