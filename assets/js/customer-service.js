// Customer Service - YAS CITY
// Enhanced chatbot with typing indicator & support tickets

const chatbotKnowledgeBase = {
    'مشاكل اللابتوب': {
        response: 'يمكنني مساعدتك في مشاكل اللابتوب الشائعة. ما نوع المشكلة التي تواجهها؟',
        options: ['اللابتوب لا يعمل', 'بطء في الأداء', 'مشاكل في الشاشة', 'مشاكل في البطارية', 'مشاكل في الإنترنت', 'مشاكل في الكيبورد', 'مشاكل في التشغيل الصوتي', 'مشاكل أخرى']
    },
    'اللابتوب لا يعمل': {
        response: 'إذا كان اللابتوب لا يعمل تماماً، جرب الخطوات التالية:\n\n1. تأكد من توصيل الشاحن بشكل صحيح\n2. اضغط على زر الطاقة لمدة 10 ثواني\n3. تحقق من وجود إضاءة في مؤشر الشحن\n4. افصل الشاحن وانتظر دقيقة ثم أعد توصيله\n\nإذا لم يعمل، يفضل إحضاره لفحص فني.',
        options: ['حجز موعد صيانة', 'مشاكل أخرى', 'العودة للقائمة الرئيسية']
    },
    'بطء في الأداء': {
        response: 'لحل مشكلة البطء، جرب:\n\n1. إغلاق البرامج غير المستخدمة\n2. تنظيف القرص من الملفات غير الضرورية\n3. تحديث النظام والبرامج\n4. زيادة الرام إذا كانت أقل من 8GB\n5. فحص الجهاز من الفيروسات\n\nنحن نقدم خدمة تحسين الأداء الاحترافية.',
        options: ['حجز موعد صيانة', 'مشاكل أخرى', 'العودة للقائمة الرئيسية']
    },
    'مشاكل في الشاشة': {
        response: 'مشاكل الشاشة قد تكون:\n\n1. مشكلة في كابل الشاشة\n2. مشكلة في كارت الشاشة\n3. مشكلة في الشاشة نفسها\n4. مشكلة في تعريفات الشاشة\n\nنحتاج لفحص الجهاز لتحديد المشكلة بدقة.',
        options: ['حجز موعد صيانة', 'مشاكل أخرى', 'العودة للقائمة الرئيسية']
    },
    'مشاكل في البطارية': {
        response: 'مشاكل البطارية الشائعة:\n\n1. البطارية لا تشحن\n2. البطارية تفرغ بسرعة\n3. البطارية لا تعمل\n4. البطارية تتسخن عند الشحن\n\nنحن نقدم خدمة استبدال البطاريات الأصلية.',
        options: ['حجز موعد صيانة', 'مشاكل أخرى', 'العودة للقائمة الرئيسية']
    },
    'مشاكل في الإنترنت': {
        response: 'لحل مشاكل الإنترنت:\n\n1. تأكد من تشغيل الواي فاي\n2. أعد تشغيل الراوتر\n3. تحديث تعريفات الشبكة\n4. تحقق من إعدادات الويندوز\n5. تأكد من أن الواي فاي يعمل على أجهزة أخرى',
        options: ['حجز موعد صيانة', 'مشاكل أخرى', 'العودة للقائمة الرئيسية']
    },
    'مشاكل في الكيبورد': {
        response: 'مشاكل الكيبورد الشائعة:\n\n1. بعض الأزرار لا تعمل\n2. الكيبورد كله لا يعمل\n3. الأزرار تلتصق معاً\n\nيمكن تنظيف الكيبورد أو استبداله.',
        options: ['حجز موعد صيانة', 'مشاكل أخرى', 'العودة للقائمة الرئيسية']
    },
    'مشاكل في التشغيل الصوتي': {
        response: 'مشاكل الصوت الشائعة:\n\n1. لا يوجد صوت نهائياً\n2. الصوت منخفض جداً\n3. الصوت مشوه\n4. الميكروفون لا يعمل\n\nتحقق من إعدادات الصوت وتعريفات الكارت الصوتي.',
        options: ['حجز موعد صيانة', 'مشاكل أخرى', 'العودة للقائمة الرئيسية']
    },
    'مشاكل أخرى': {
        response: 'ما هي المشكلة الأخرى التي تواجهها؟\n\nيمكنني مساعدتك في:\n- مشاكل الفأرة/التاتش باد\n- مشاكل المنافذ (USB)\n- مشاكل الكاميرا\n- مشاكل التشغيل\n- مشاكل البرامج',
        options: ['مشاكل الفأرة', 'مشاكل المنافذ', 'مشاكل الكاميرا', 'مشاكل التشغيل', 'مشاكل البرامج', 'العودة للقائمة الرئيسية']
    },
    'مشاكل الفأرة': {
        response: 'مشاكل الفأرة الشائعة:\n\n1. الفأرة لا تتحرك\n2. النقر لا يعمل\n3. الفأرة تتحرك لوحدها\n\nيمكن تنظيف الفأرة أو استبدالها.',
        options: ['حجز موعد صيانة', 'العودة للقائمة الرئيسية']
    },
    'مشاكل المنافذ': {
        response: 'مشاكل منافذ USB:\n\n1. المنفذ لا يعمل نهائياً\n2. المنفذ يعمل بشكل متقطع\n3. الجهاز لا يتعرف على الأجهزة المتصلة\n\nقد يكون المشكلة في تعريفات المنافذ أو في المنفذ نفسه.',
        options: ['حجز موعد صيانة', 'العودة للقائمة الرئيسية']
    },
    'مشاكل الكاميرا': {
        response: 'مشاكل الكاميرا:\n\n1. الكاميرا لا تعمل\n2. الصورة ضبابية\n3. الكاميرا سوداء\n\nتحقق من إعدادات الخصوصية وتعريفات الكاميرا.',
        options: ['حجز موعد صيانة', 'العودة للقائمة الرئيسية']
    },
    'مشاكل التشغيل': {
        response: 'مشاكل التشغيل:\n\n1. الويندوز لا يبدأ\n2. الجهاز يتجمد عند التشغيل\n3. شاشة زرقاء (Blue Screen)\n4. إعادة التشغيل المستمرة\n\nقد تحتاج لإعادة تثبيت الويندوز أو فحص الهارد.',
        options: ['حجز موعد صيانة', 'العودة للقائمة الرئيسية']
    },
    'مشاكل البرامج': {
        response: 'مشاكل البرامج:\n\n1. البرامج لا تثبت\n2. البرامج تتعطل باستمرار\n3. البرامج لا تعمل\n\nيمكن إعادة تثبيت البرامج أو فحص التوافق.',
        options: ['حجز موعد صيانة', 'العودة للقائمة الرئيسية']
    },
    'أسعار الصيانة': {
        response: 'أسعارنا تنافسية وشفافة:\n\n🔧 فحص مجاني\n💾 استبدال هارد: من 500 جنيه\n🔋 استبدال بطارية: من 800 جنيه\n🖥️ استبدال شاشة: من 1500 جنيه\n⚡ تحسين أداء: من 300 جنيه\n🧹 تنظيف داخلي: من 200 جنيه\n🎹 استبدال كيبورد: من 400 جنيه\n🖱️ استبدال فأرة: من 150 جنيه\n📹 استبدال كاميرا: من 300 جنيه\n💿 إعادة تثبيت ويندوز: من 200 جنيه\n\nللحصول على سعر دقيق، استخدم مركز YAS التقني الذكي.',
        options: ['استخدام مركز التشخيص', 'حجز موعد صيانة', 'العودة للقائمة الرئيسية']
    },
    'استخدام مركز التشخيص': {
        response: 'سأوجهك لمركز YAS التقني الذكي لتقدير تكلفة الصيانة مجاناً.',
        options: ['الذهاب للمركز التقني', 'العودة للقائمة الرئيسية'],
        action: () => window.location.href = 'index.html#tech-counselor'
    },
    'شراء جهاز جديد': {
        response: 'نحن نقدم مجموعة متنوعة من اللابتوبات:\n\n💻 لابتوبات مستعملة مجددة\n🆕 لابتوبات جديدة\n🎮 لابتوبات للألعاب\n💼 لابتوبات للعمل\n🎓 لابتوبات للطلاب\n\nيمكنك استخدام قسم "اختر جهازك" للحصول على التوصية المناسبة.',
        options: ['اختر جهاز مناسب', 'عرض الأجهزة المتاحة', 'أسعار الأجهزة', 'العودة للقائمة الرئيسية']
    },
    'اختر جهاز مناسب': {
        response: 'سأوجهك لأداة "اختر جهازك المثالي" التي ستساعدك في اختيار اللابتوب المناسب حسب احتياجاتك وميزانيتك.',
        options: ['الذهاب لاختيار الجهاز', 'العودة للقائمة الرئيسية'],
        action: () => window.location.href = 'index.html#pc-quiz'
    },
    'الذهاب لاختيار الجهاز': {
        response: 'جاري التوجيه...',
        options: [],
        action: () => window.location.href = 'index.html#pc-quiz'
    },
    'عرض الأجهزة المتاحة': {
        response: 'يمكنك عرض الأجهزة المتاحة في قسم "منتجاتنا" في الصفحة الرئيسية.\n\nنوفر:\n- لابتوبات بأسعار مناسبة\n- ضمان على جميع الأجهزة\n- خدمة ما بعد البيع',
        options: ['الذهاب للصفحة الرئيسية', 'أسعار الأجهزة', 'العودة للقائمة الرئيسية']
    },
    'أسعار الأجهزة': {
        response: 'أسعار الأجهزة تختلف حسب المواصفات:\n\n📊 لابتوبات مستعملة: من 3000 جنيه\n🆕 لابتوبات جديدة: من 8000 جنيه\n🎮 لابتوبات ألعاب: من 15000 جنيه\n💼 لابتوبات عمل: من 10000 جنيه\n\nللحصول على سعر دقيق، تواصل معنا.',
        options: ['التواصل مع موظف', 'عرض الأجهزة المتاحة', 'العودة للقائمة الرئيسية']
    },
    'التواصل مع موظف': {
        response: 'يمكنك التواصل مع فريق الدعم البشري:\n\n📞 هاتف: 01147800144\n📱 واتساب: 01147800144\n👤 مسؤول خدمة العملاء: أدم فاروق\n📱 رقم أدم: 01559684422\n\nأوقات العمل: 9 صباحاً - 9 مساءً',
        options: ['اتصل بـ أدم فاروق', 'واتساب أدم فاروق', 'فتح تذكرة دعم', 'العودة للقائمة الرئيسية']
    },
    'فتح تذكرة دعم': {
        response: 'يمكنك فتح تذكرة دعم من النموذج أسفل الشات. املأ بياناتك وسيتواصل معك فريقنا في أقرب وقت.',
        options: ['العودة للقائمة الرئيسية'],
        action: () => document.querySelector('.ticket-section')?.scrollIntoView({ behavior: 'smooth' })
    },
    'اتصل بـ أدم فاروق': {
        response: 'يمكنك الاتصال بأدم فاروق مباشرة على: 01559684422\n\nأو عبر واتساب على نفس الرقم.\n\nأوقات العمل: 9 صباحاً - 9 مساءً',
        options: ['اتصل الآن', 'واتساب', 'العودة للقائمة الرئيسية']
    },
    'واتساب أدم فاروق': {
        response: 'يمكنك التواصل مع أدم فاروق عبر واتساب على:\n\n📱 01559684422',
        options: ['فتح واتساب', 'العودة للقائمة الرئيسية']
    },
    'حجز موعد صيانة': {
        response: 'لحجز موعد صيانة:\n\n1. اتصل بنا على 01147800144\n2. أو عبر واتساب على نفس الرقم\n3. أو افتح تذكرة دعم من النموذج أسفل\n\nالعنوان: دمياط - الزرقا - كفر المياسرة',
        options: ['اتصل الآن', 'واتساب', 'فتح تذكرة دعم', 'العودة للقائمة الرئيسية']
    },
    'اتصل الآن': {
        response: 'يمكنك الاتصال بنا على:\n\n📞 01147800144\n\nأو مع أدم فاروق على:\n📱 01559684422',
        options: ['واتساب', 'العودة للقائمة الرئيسية'],
        action: () => window.location.href = 'tel:01559684422'
    },
    'واتساب': {
        response: 'يمكنك التواصل معنا عبر واتساب على:\n\n📱 01147800144\n\nأو مع أدم فاروق على:\n📱 01559684422',
        options: ['فتح واتساب', 'العودة للقائمة الرئيسية']
    },
    'فتح واتساب': {
        response: 'جاري فتح واتساب...',
        options: ['العودة للقائمة الرئيسية'],
        action: () => window.open('https://wa.me/201559684422', '_blank')
    },
    'الذهاب للصفحة الرئيسية': {
        response: 'جاري التوجيه للصفحة الرئيسية...',
        options: [],
        action: () => window.location.href = 'index.html'
    },
    'الذهاب للمركز التقني': {
        response: 'جاري التوجيه...',
        options: [],
        action: () => window.location.href = 'index.html#tech-counselor'
    },
    'العودة للقائمة الرئيسية': {
        response: 'مرحباً! 👋 أنا مساعد YAS الذكي. كيف يمكنني مساعدتك اليوم؟',
        options: ['مشاكل اللابتوب', 'أسعار الصيانة', 'شراء جهاز جديد', 'التواصل مع موظف', 'حجز موعد صيانة']
    },
    'default': {
        response: 'شكراً لسؤالك. يمكنني مساعدتك في:\n\n🔧 مشاكل اللابتوب\n💰 أسعار الصيانة\n💻 شراء جهاز جديد\n👥 التواصل مع موظف\n📅 حجز موعد صيانة\n\nأو يمكنك فتح تذكرة دعم من النموذج أسفل الشات.',
        options: ['مشاكل اللابتوب', 'أسعار الصيانة', 'شراء جهاز جديد', 'التواصل مع موظف', 'حجز موعد صيانة']
    }
};

let currentContext = null;
let isTyping = false;
let yasDb = null;

// Initialize Supabase
if (typeof SUPABASE_URL !== 'undefined' && typeof supabase !== 'undefined') {
    try {
        yasDb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch(e) { console.warn('DB init failed:', e); }
}

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('user-input');
    if (input) input.focus();
});

// ---- Toast Notifications ----
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// ---- Typing Indicator ----
function showTypingIndicator() {
    const container = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
}

// ---- Chat Functions ----
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message || isTyping) return;

    addMessage(message, 'user');
    input.value = '';
    respondWithDelay(message);
}

function respondWithDelay(message) {
    isTyping = true;
    showTypingIndicator();

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
        hideTypingIndicator();
        processMessage(message);
        isTyping = false;
    }, delay);
}

function processMessage(message) {
    const response = getBotResponse(message);
    addMessage(response.response, 'bot', response.options);
    if (response.action) setTimeout(response.action, 500);
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    for (const key in chatbotKnowledgeBase) {
        if (key === 'default') continue;
        if (lowerMessage.includes(key.toLowerCase())) {
            currentContext = key;
            return chatbotKnowledgeBase[key];
        }
    }

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

    currentContext = null;
    return chatbotKnowledgeBase['default'];
}

function addMessage(text, sender, options = []) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    let messageHTML = `<div class="message-content"><p>${text.replace(/\n/g, '<br>')}</p>`;

    if (options && options.length > 0) {
        messageHTML += '<div class="quick-replies">';
        options.forEach(option => {
            messageHTML += `<button class="quick-reply" onclick="sendQuickReply('${option.replace(/'/g, "\\'")}')">${option}</button>`;
        });
        messageHTML += '</div>';
    }

    messageHTML += '</div>';
    messageDiv.innerHTML = messageHTML;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendQuickReply(option) {
    if (isTyping) return;
    addMessage(option, 'user');

    isTyping = true;
    showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator();
        if (chatbotKnowledgeBase[option]) {
            currentContext = option;
            const entry = chatbotKnowledgeBase[option];
            if (entry.action) entry.action();
            addMessage(entry.response, 'bot', entry.options);
        } else {
            processMessage(option);
        }
        isTyping = false;
    }, 500);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') sendMessage();
}

// ---- Support Ticket ----
async function submitSupportTicket(event) {
    event.preventDefault();

    const btn = document.getElementById('ticket-submit-btn');
    const name = document.getElementById('ticket-name').value.trim();
    const phone = document.getElementById('ticket-phone').value.trim();
    const category = document.getElementById('ticket-category').value;
    const message = document.getElementById('ticket-message').value.trim();

    if (!name || !phone || !category || !message) {
        showToast('يرجى ملء جميع الحقول', 'error');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

    const categoryLabels = {
        repair: 'صيانة جهاز',
        device_request: 'طلب شراء لابتوب',
        general: 'استفسار عام',
        complaint: 'شكوى'
    };

    const ticketData = {
        id: Date.now(),
        type: category === 'device_request' ? 'device_request' : (category === 'repair' ? 'repair' : 'contact'),
        name,
        phone,
        message: `[${categoryLabels[category] || category}] ${message}`,
        notes: message,
        created_at: new Date().toISOString(),
        status: 'new'
    };

    if (window.saveInquiry) {
        await window.saveInquiry(ticketData);
    } else {
        try {
            let inquiries = JSON.parse(localStorage.getItem('yas_inquiries') || '[]');
            inquiries.unshift(ticketData);
            localStorage.setItem('yas_inquiries', JSON.stringify(inquiries));
        } catch (e) { console.error('Local storage error:', e); }

        if (yasDb) {
            try {
                await yasDb.from('inquiries').insert([ticketData]);
            } catch (e) { console.warn('Supabase save failed:', e); }
        }
    }

    const ticketId = ticketData.id.toString().slice(-6);
    showToast(`تم إرسال تذكرتك بنجاح! رقم التذكرة: #${ticketId}`, 'success');
    document.getElementById('ticket-form').reset();

    addMessage(`تم استلام تذكرتك #${ticketId} بنجاح! سيتواصل معك فريقنا قريباً.`, 'bot', ['العودة للقائمة الرئيسية']);
    document.getElementById('chat-messages').scrollIntoView({ behavior: 'smooth' });

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال التذكرة';
}

// ---- FAQ Toggle ----
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');

    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.querySelector('.faq-answer')?.classList.remove('active');
            const otherIcon = item.querySelector('.faq-question i');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
    });

    if (answer.classList.contains('active')) {
        answer.classList.remove('active');
        icon.style.transform = 'rotate(0deg)';
    } else {
        answer.classList.add('active');
        icon.style.transform = 'rotate(180deg)';
    }
}
