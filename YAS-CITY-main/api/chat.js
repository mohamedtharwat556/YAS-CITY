const axios = require('axios');

// For production, you would use process.env.GEMINI_API_KEY
// and call the real Google Gemini API or OpenAI API.
const SYSTEM_PROMPT = `
أنت المساعد الذكي لشركة "YAS CITY". أنت خبير تقني في صيانة اللابتوب وبيع الأجهزة. 
يجب أن تكون إجاباتك احترافية، ودودة، وتدعم هوية الشركة. 
تذكر دائماً أننا متميزون في صيانة البوردة وتدريب المهندسين. 
الأسعار لدينا تنافسية والضمان حقيقي.
خدماتنا: صيانة، بيع لابتوبات (Dell, HP, Apple, etc.)، تحديث أجهزة.
تواصل الصيانة: 01147800144
تواصل المبيعات: 01158986999
`;

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // Mocking AI Response for now - can be replaced with real fetch to Gemini/OpenAI
        // If API Key is present, we would call it here.
        let responseText = `أهلاً بك في YAS CITY! أنا المساعد الذكي لمساعدتك. بخصوص سؤالك عن "${message}"، نحن نوفر أفضل الحلول التقنية. هل تود أن أحولك لقسم الصيانة أم المبيعات؟`;

        // Simple keyword logic for mock
        if (message.includes('صيانة') || message.includes('عطل')) {
            responseText = "نحن متخصصون في أعقد أعطال البوردة. يمكنك التواصل مباشرة مع الفني عبر الواتساب: 01147800144.";
        } else if (message.includes('سعر') || message.includes('شراء')) {
            responseText = "لدينا تشكيلة لابتوبات تناسب كل الميزانيات. تواصل مع المبيعات: 01158986999 لتفاصيل الأسعار الحالية.";
        }

        return res.status(200).json({ response: responseText });
    } catch (err) {
        console.error('AI Chat Error:', err);
        return res.status(500).json({ error: 'Error processing chat' });
    }
};
