// Customer Service Chatbot - YAS CITY
// Intelligent Chatbot with FAQ Database

const chatbotKnowledgeBase = {
    // Laptop Problems
    'مشاكل اللابتوب': {
        response: 'يمكنني مساعدتك في مشاكل اللابتوب الشائعة. ما نوع المشكلة التي تواجهها؟',
        options: ['اللابتوب لا يعمل', 'بطء في الأداء', 'مشاكل في الشاشة', 'مشاكل في البطارية', 'مشاكل في الإنترنت', 'مشاكل أخرى']
    },
    'اللابتوب لا يعمل': {
        response: 'إذا كان اللابتوب لا يعمل تماماً، جرب الخطوات التالية:\n1. تأكد من توصيل الشاحن بشكل صحيح\n2. اضغط على زر الطاقة لمدة 10 ثواني\n3. تحقق من وجود إضاءة في مؤشر الشحن\n\nإذا لم يعمل، يفضل إحضاره لفحص فني.',
        options: ['حجز موعد صيانة', 'العودة للقائمة الرئيسية']
    },
    'بطء في الأداء': {
        response: 'لحل مشكلة البطء، جرب:\n1. إغلاق البرامج غير المستخدمة\n2. تنظيف القرص من الملفات غير الضرورية\n3. تحديث النظام والبرامج\n4. زيادة الرام إذا كانت أقل من 8GB\n\nنحن نقدم خدمة تحسين الأداء الاحترافية.',
        options: ['حجز موعد صيانة', 'العودة للقائمة الرئيسية']
    },
    'مشاكل في الشاشة': {
        response: 'مشاكل الشاشة قد تكون:\n1. مشكلة في كابل الشاشة\n2. مشكلة في كارت الشاشة\n3. مشكلة في الشاشة نفسها\n\nنحتاج لفحص الجهاز لتحديد المشكلة بدقة.',
        options: ['حجز موعد صيانة', 'العودة للقائمة الرئيسية']
    },
    'مشاكل في البطارية': {
        response: 'مشاكل البطارية الشائعة:\n1. البطارية لا تشحن\n2. البطارية تفرغ بسرعة\n3. البطارية لا تعمل\n\nنحن نقدم خدمة استبدال البطاريات الأصلية.',
        options: ['حجز موعد صيانة', 'العودة للقائمة الرئيسية']
    },
    'مشاكل في الإنترنت': {
        response: 'لحل مشاكل الإنترنت:\n1. تأكد من تشغيل الواي فاي\n2. أعد تشغيل الراوتر\n3. تحديث تعريفات الشبكة\n4. تحقق من إعدادات الويندوز',
        options: ['حجز موعد صيانة', 'العودة للقائمة الرئيسية']
    },
    
    // Pricing
    'أسعار الصيانة': {
        response: 'أسعارنا تنافسية وشفافة:\n\n🔧 فحص مجاني\n💾 استبدال هارد: من 500 جنيه\n🔋 استبدال بطارية: من 800 جنيه\n🖥️ استبدال شاشة: من 1500 جنيه\n⚡ تحسين أداء: من 300 جنيه\n🧹 تنظيف داخلي: من 200 جنيه\n\nللحصول على سعر دقيق، استخدم مركز YAS التقني الذكي.',
        options: ['استخدام مركز التشخيص', 'حجز موعد صيانة', 'العودة للقائمة الرئيسية']
    },
    
    // New Device Purchase
    'شراء جهاز جديد': {
        response: 'نحن نقدم مجموعة متنوعة من اللابتوبات:\n\n💻 لابتوبات مستعملة مجددة\n🆕 لابتوبات جديدة\n🎮 لابتوبات للألعاب\n💼 لابتوبات للعمل\n\nيمكنك استخدام قسم "اختر جهازك" للحصول على التوصية المناسبة.',
        options: ['اختر جهاز مناسب', 'عرض الأجهزة المتاحة', 'العودة للقائمة الرئيسية']
    },
    
    // Contact Human
    'التواصل مع موظف': {
        response: 'يمكنك التواصل مع فريق الدعم البشري:\n\n📞 هاتف: 01147800144\n📱 واتساب: 01147800144\n👤 مسؤول خدمة العملاء: أدم فاروق\n📱 رقم أدم: 01559684422\n\nأوقات العمل: 9 صباحاً - 9 مساءً',
        options: ['اتصل بـ أدم فاروق', 'واتساب أدم فاروق', 'العودة للقائمة الرئيسية']
    },
    
    // General
    'حجز موعد صيانة': {
        response: 'لحجز موعد صيانة:\n\n1. اتصل بنا على 01147800144\n2. أو عبر واتساب على نفس الرقم\n3. أو احضر الجهاز مباشرة لمقرنا\n\nالعنوان: دمياط - الزرقا - كفر المياسرة',
        options: ['اتصل الآن', 'واتساب', 'العودة للقائمة الرئيسية']
    },
    
    'العودة للقائمة الرئيسية': {
        response: 'مرحباً! 👋 أنا مساعد YAS الذكي. كيف يمكنني مساعدتك اليوم؟',
        options: ['مشاكل اللابتوب', 'أسعار الصيانة', 'شراء جهاز جديد', 'التواصل مع موظف']
    },
    
    'default': {
        response: 'شكراً لسؤالك. يمكنني مساعدتك في:\n\n🔧 مشاكل اللابتوب\n💰 أسعار الصيانة\n💻 شراء جهاز جديد\n👥 التواصل مع موظف\n\nأو يمكنك التواصل مباشرة مع أدم فاروق على 01559684422',
        options: ['مشاكل اللابتوب', 'أسعار الصيانة', 'شراء جهاز جديد', 'التواصل مع موظف']
    }
};

// Chat State
let currentContext = null;
let messageHistory = [];

// Initialize Chatbot
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('user-input');
    if (input) {
        input.focus();
    }
});

// Send Message
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Process message
    setTimeout(() => {
        processMessage(message);
    }, 500);
}

// Process User Message
function processMessage(message) {
    const response = getBotResponse(message);
    addMessage(response.response, 'bot', response.options);
}

// Get Bot Response
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for exact matches
    for (const key in chatbotKnowledgeBase) {
        if (lowerMessage.includes(key.toLowerCase())) {
            currentContext = key;
            return chatbotKnowledgeBase[key];
        }
    }
    
    // Check for context-based responses
    if (currentContext && chatbotKnowledgeBase[currentContext]) {
        const contextOptions = chatbotKnowledgeBase[currentContext].options || [];
        for (const option of contextOptions) {
            if (lowerMessage.includes(option.toLowerCase())) {
                if (chatbotKnowledgeBase[option]) {
                    currentContext = option;
                    return chatbotKnowledgeBase[option];
                }
            }
        }
    }
    
    // Default response
    currentContext = null;
    return chatbotKnowledgeBase['default'];
}

// Add Message to Chat
function addMessage(text, sender, options = []) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    let messageHTML = `<div class="message-content"><p>${text.replace(/\n/g, '<br>')}</p>`;
    
    if (options && options.length > 0) {
        messageHTML += '<div class="quick-replies">';
        options.forEach(option => {
            messageHTML += `<button class="quick-reply" onclick="sendQuickReply('${option}')">${option}</button>`;
        });
        messageHTML += '</div>';
    }
    
    messageHTML += '</div>';
    messageDiv.innerHTML = messageHTML;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add to history
    messageHistory.push({ text, sender, timestamp: new Date() });
}

// Send Quick Reply
function sendQuickReply(option) {
    addMessage(option, 'user');
    setTimeout(() => {
        if (chatbotKnowledgeBase[option]) {
            currentContext = option;
            addMessage(
                chatbotKnowledgeBase[option].response,
                'bot',
                chatbotKnowledgeBase[option].options
            );
        } else {
            processMessage(option);
        }
    }, 300);
}

// Handle Enter Key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// FAQ Toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.querySelector('.faq-answer').style.display = 'none';
            item.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    } else {
        answer.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    }
}

// Contact Actions
function contactAdam() {
    window.location.href = 'tel:01559684422';
}

function whatsappAdam() {
    window.open('https://wa.me/201559684422', '_blank');
}
