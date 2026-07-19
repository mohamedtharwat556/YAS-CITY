// Initialize Supabase Client (Browser Side)
if (typeof SUPABASE_URL !== 'undefined' && typeof supabase !== 'undefined') {
    try {
        // Store client in yasDb to avoid overwriting the CDN library
        window.yasDb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("YAS DB ready");
    } catch(e) {
        console.warn("DB init failed:", e);
        window.yasDb = null;
    }
}

// 1. Core State
// Telegram Notification Helper
window.sendTelegramAlert = async function(data) {
    const token = localStorage.getItem('yas_tg_token');
    const chatId = localStorage.getItem('yas_tg_chat');
    if(!token || !chatId) return;

    const typeLabels = { repair: 'صيانة', device_request: 'طلب جهاز', trade_in: 'استبدال', ticket: 'تذكرة', contact: 'تواصل' };
    const typeLabel = typeLabels[data.type] || 'مبيعات';
    const detail = data.fault || data.message || data.device_name || data.device_type || 'استفسار عام';
    const message = `🔔 *طلب جديد YAS CITY*\n` +
                `👤 العميل: ${data.name || 'عميل'}\n` +
                `📞 الهاتف/الواتس: ${data.phone || 'غير مسجل'}\n` +
                `💻 القسم: ${typeLabel}\n` +
                `📍 التفاصيل: ${detail}\n` +
                `💰 تقدير السعر: ${data.estimate || 'غير محدد'}`;
    try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ chat_id: chatId, text: message })
        });
    } catch(e) { console.error('TG Send Error', e); }
};


let isDarkMode = localStorage.getItem('siteTheme') === 'dark';
let currentLang = localStorage.getItem('siteLang') || 'ar';

// Translations Object
const translations = {
    ar: {
        nav_home: 'الرئيسية', nav_about: 'من نحن', nav_services: 'أقسامنا',
        nav_gallery: 'معرض الصور', nav_products: 'منتجاتنا', nav_contact: 'اتصل بنا',
        nav_estimator: 'مقدّر الإصلاح', nav_quiz: 'اختر جهازك',
        nav_team: 'الفريق', nav_counselor: 'المستشار التقني',
        hero_title: 'مرحباً بك في شركة YAS',
        hero_subtitle: 'التميز والابتكار في كل خطوة',
        hero_btn: 'اكتشف المزيد',
        about_title: 'من نحن',
        about_p1: 'شركة YAS هي شركة رائدة في مجالها، ملتزمة بتقديم أفضل الخدمات والمنتجات لعملائنا.',
        about_p2: 'مع فريق من المحترفين المتميزين وخبرة تمتد لسنوات، نسعى دائماً لتحقيق التميز.',
        count_exp: 'سنوات خبرة', count_proj: 'مشروع مكتمل', count_client: 'عميل سعيد', count_award: 'جائزة تميز',
        services_title: 'أقسام الشركة',
        srv_maint_title: 'قسم الصيانة', srv_maint_desc: 'نقدم خدمات صيانة شاملة ومتكاملة لضمان استمرارية وكفاءة عملك.',
        srv_online_title: 'قسم الأونلاين', srv_online_desc: 'إدارة وتطوير تواجدك الرقمي وتقديم حلول متكاملة في التجارة الإلكترونية.',
        srv_sales_title: 'قسم المبيعات', srv_sales_desc: 'توفير أفضل المنتجات والحلول مع فريق مبيعات متميز.',
        products_title: 'منتجاتنا المميزة',
        gallery_title: 'معرض الصور',
        gal_team_title: 'فريق العمل', gal_team_desc: 'فريق من المحترفين المتميزين',
        gal_hq_title: 'المقر الرئيسي', gal_hq_desc: 'مقر حديث ومجهز بأحدث التقنيات',
        team_title: 'فريق العمل',
        team_1_name: 'محمد ياسين', team_1_role: 'المدير التنفيذي',
        team_2_name: 'محمد مسعد', team_2_role: 'مدير العمليات',
        contact_title: 'اتصل بنا',
        con_address_title: '📍 العنوان', con_address_val: 'دمياط - الزرقا - كفر المياسرة',
        con_phone_title: '📞 الهاتف', con_email_title: '📧 الإيميل',
        form_name: 'الاسم', form_email: 'الإيميل', form_msg: 'رسالتك', form_btn: 'إرسال',
        login_btn_nav: 'تسجيل الدخول', logout_btn: 'تسجيل الخروج',
        auth_error_fields: 'يرجى ملء جميع الحقول',
        auth_error_pass_mismatch: 'كلمتا المرور غير متطابقتين',
        auth_success_reg: 'تم تسجيل الحساب بنجاح',
        dash_status_sent: 'مُرسلة',
        faq_title: 'الأسئلة الشائعة',
        faq_1_q: 'ما هي أبرز خدمات قسم الصيانة؟', faq_1_a: 'نقدم خدمات متكاملة للصيانة الوقائية والطارئة.',
        faq_2_q: 'كيف يمكنني الاستفادة من قسم الأونلاين؟', faq_2_a: 'فريقنا يقوم بتطوير المتاجر الإلكترونية.',
        faq_3_q: 'هل تقدمون استشارات مجانية؟', faq_3_a: 'نعم، يمكنك حجز جلسة استشارة مجانية.',
        final_cta_title: 'هل أنت جاهز لبدء مشروعك معنا؟',
        final_cta_desc: 'تواصل معنا اليوم ودعنا نساعدك في تحقيق أهدافك.',
        final_btn_1: 'تواصل الآن', final_btn_2: 'تحدث عبر الواتساب',
    },
    en: {
        nav_home: 'Home', nav_about: 'About', nav_services: 'Services',
        nav_gallery: 'Gallery', nav_products: 'Products', nav_contact: 'Contact',
        nav_estimator: 'Repair Estimator', nav_quiz: 'Find Your Device',
        nav_team: 'Team', nav_counselor: 'Tech Advisor',
        hero_title: 'Welcome to YAS Company',
        hero_subtitle: 'Excellence & Innovation in Every Step',
        hero_btn: 'Discover More',
        about_title: 'About Us',
        about_p1: 'YAS is a leading company committed to delivering the best services and products.',
        about_p2: 'With a team of outstanding professionals, we always strive for excellence.',
        count_exp: 'Years Experience', count_proj: 'Projects Done', count_client: 'Happy Clients', count_award: 'Awards',
        services_title: 'Our Departments',
        srv_maint_title: 'Maintenance', srv_maint_desc: 'Comprehensive maintenance services for your systems.',
        srv_online_title: 'Online', srv_online_desc: 'Digital presence management and e-commerce solutions.',
        srv_sales_title: 'Sales', srv_sales_desc: 'Best products and solutions for all your needs.',
        products_title: 'Our Products',
        gallery_title: 'Photo Gallery',
        gal_team_title: 'Our Team', gal_team_desc: 'A team of outstanding professionals',
        gal_hq_title: 'Headquarters', gal_hq_desc: 'Modern, fully-equipped headquarters',
        team_title: 'Our Team',
        team_1_name: 'Mohamed Yassin', team_1_role: 'CEO',
        team_2_name: 'Mohamed Masaad', team_2_role: 'Operations Manager',
        contact_title: 'Contact Us',
        con_address_title: 'Address', con_address_val: 'Damietta - El Zarqa',
        con_phone_title: 'Phone', con_email_title: 'Email',
        form_name: 'Name', form_email: 'Email', form_msg: 'Your Message', form_btn: 'Send',
        login_btn_nav: 'Login', logout_btn: 'Logout',
        auth_error_fields: 'Please fill all required fields',
        auth_error_pass_mismatch: 'Passwords do not match',
        auth_success_reg: 'Account created successfully',
        dash_status_sent: 'Sent',
        faq_title: 'FAQ',
        faq_1_q: 'What are your main maintenance services?', faq_1_a: 'We offer comprehensive maintenance services.',
        faq_2_q: 'How can I use the online department?', faq_2_a: 'Our team develops e-commerce solutions.',
        faq_3_q: 'Do you offer free consultations?', faq_3_a: 'Yes, you can book a free consultation session.',
        final_cta_title: 'Ready to start your project with us?',
        final_cta_desc: 'Contact us today and let us help you achieve your goals.',
        final_btn_1: 'Contact Now', final_btn_2: 'Chat on WhatsApp',
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 2. Preloader Removal
    const removePreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => preloader.remove(), 500);
            }, 500);
        }
    };

    if (document.readyState === 'complete') {
        removePreloader();
    } else {
        window.addEventListener('load', removePreloader);
    }
    setTimeout(removePreloader, 3000);

    // 3. Apply Saved Preferences
    if (isDarkMode) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-sun';
        }
    }
    updateAuthUI();

    // 10. Multi-action FAB Logic
    const fabMain = document.getElementById('fabMain');
    const fabContainer = document.querySelector('.floating-fab-container');
    if (fabMain && fabContainer) {
        fabMain.addEventListener('click', () => {
            fabContainer.classList.toggle('active');
        });
    }

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-mode', isDarkMode);
            localStorage.setItem('siteTheme', isDarkMode ? 'dark' : 'light');
            const icon = themeBtn.querySelector('i');
            if (icon) icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Header Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // Interactive Counters
    const counters = document.querySelectorAll('.counter-number');
    let countersStarted = false;
    const countUp = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const increment = target / 100;
        if (count < target) {
            el.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(el), 20);
        } else {
            el.innerText = target + (target >= 500 ? '+' : '');
        }
    };
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                counters.forEach(counter => countUp(counter));
                countersStarted = true;
            }
        });
    }, { threshold: 0.5 });
    const countersSection = document.querySelector('.counters-section');
    if (countersSection) counterObserver.observe(countersSection);

    // Fade-in Elements
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.service-card, .gallery-item, .contact-item, .map-wrapper').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // Gallery Modal
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const modal = createImageModal(img.src, img.alt);
            document.body.appendChild(modal);
        });
    });

    // Contact Form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name-input').value;
            const email = document.getElementById('email-input').value;
            const message = document.getElementById('msg-input').value;
            const inquiries = JSON.parse(localStorage.getItem('yas_inquiries') || '[]');
            const inquiryData = { type: 'contact', name, email, message, status: 'new', created_at: new Date().toISOString() };
            inquiries.push({ name, email, message, date: new Date().toLocaleDateString() });
            localStorage.setItem('yas_inquiries', JSON.stringify(inquiries));
            if(window.sendTelegramAlert) window.sendTelegramAlert(inquiryData);
            alert(currentLang === 'ar' ? 'تم ارسال رسالتك بنجاح' : 'Message sent successfully');
            contactForm.reset();
        });
    }

    // Typing Effect
    const wordsAr = ["التميز", "الابتكار", "الاحترافية", "الثقة"];
    const wordsEn = ["Excellence", "Innovation", "Professionalism", "Trust"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    const typingElement = document.querySelector('.typing-text');
    function typeEffect() {
        if (!typingElement) return;
        const words = currentLang === 'ar' ? wordsAr : wordsEn;
        const currentWord = words[wordIndex];
        typingElement.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        let typeSpeed = isDeleting ? 50 : 150;
        if (!isDeleting && charIndex === currentWord.length) { typeSpeed = 1500; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500; }
        setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 1000);

    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('active'); i.querySelector('.faq-answer').style.maxHeight = null; });
            if (!isActive) { item.classList.add('active'); const answer = item.querySelector('.faq-answer'); answer.style.maxHeight = answer.scrollHeight + "px"; }
        });
    });

    // Custom Cursor
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorCircle = document.querySelector('.custom-cursor-circle');
    if (cursorDot && cursorCircle) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px'; cursorDot.style.top = e.clientY + 'px';
            cursorCircle.style.left = e.clientX + 'px'; cursorCircle.style.top = e.clientY + 'px';
        });
        document.querySelectorAll('a, button, .selection-item').forEach(el => {
            el.addEventListener('mouseenter', () => cursorCircle.classList.add('expand'));
            el.addEventListener('mouseleave', () => cursorCircle.classList.remove('expand'));
        });
    }

    // Scroll Progress
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progressBar.style.width = (winScroll / height) * 100 + "%";
        });
    }

    // Auth Modal
    const loginBtnNav = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    if (loginBtnNav && loginModal) {
        loginBtnNav.addEventListener('click', () => { loginModal.classList.add('active'); document.body.style.overflow = 'hidden'; });
        document.querySelector('.close-modal').addEventListener('click', () => { loginModal.classList.remove('active'); document.body.style.overflow = 'auto'; });
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.auth-form').forEach(f => { f.classList.remove('active'); if (f.id === `${tab}-form`) f.classList.add('active'); });
            });
        });
    }

    // Dashboard Data
    const dashInqTable = document.getElementById('inquiries-table-body');
    const dashUsersTable = document.getElementById('users-table-body');
    if (dashInqTable || dashUsersTable) {
        const inquiries = JSON.parse(localStorage.getItem('yas_inquiries') || '[]');
        const users = JSON.parse(localStorage.getItem('yas_users') || '[]');
        if (document.getElementById('stat-inq-count')) document.getElementById('stat-inq-count').innerText = inquiries.length;
        if (document.getElementById('stat-user-count')) document.getElementById('stat-user-count').innerText = users.length;
        if (dashInqTable) {
            dashInqTable.innerHTML = inquiries.slice().reverse().map(inq => `<tr><td>${inq.date || ''}</td><td>${(inq.message || inq.fault || '').substring(0, 50)}...</td><td><span class="status-badge sent">${translations[currentLang].dash_status_sent}</span></td></tr>`).join('');
        }
        if (dashUsersTable) {
            dashUsersTable.innerHTML = users.slice().reverse().map(user => `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.date}</td></tr>`).join('');
        }
    }
});

// Helper Functions
function createImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); display: flex; justify-content: center; align-items: center; z-index: 10000; cursor: pointer; opacity: 0; transition: opacity 0.3s ease;`;
    const img = document.createElement('img'); img.src = src; img.alt = alt;
    img.style.cssText = `max-width: 90%; max-height: 90%; border-radius: 10px;`;
    modal.appendChild(img);
    modal.addEventListener('click', () => { modal.style.opacity = '0'; setTimeout(() => modal.remove(), 300); });
    setTimeout(() => modal.style.opacity = '1', 50);
    return modal;
}

function updateAuthUI() {
    const loggedInUser = JSON.parse(localStorage.getItem('yas_logged_in_user'));
    if (loggedInUser) {
        if (document.getElementById('login-btn')) document.getElementById('login-btn').style.display = 'none';
        if (document.getElementById('user-area')) document.getElementById('user-area').style.display = 'flex';
        if (document.getElementById('user-display-name')) document.getElementById('user-display-name').innerText = loggedInUser.name;
    }
}

function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) { container = document.createElement('div'); container.id = 'toast-container'; document.body.appendChild(container); }
    const toast = document.createElement('div'); toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-info-circle"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 3000);
}

// 18. Smart Repair Estimator Logic
let selectedStorage = { type: '', brand: '', fault: '', priceMin: 0, priceMax: 0, quality: 'original' };
let stepHistory = ['step-1'];

const faultDetails = {
    screen: {
        name: 'كسر شاشة',
        original: { min: 1500, max: 3500, warranty: '6 شهور', time: 'ساعتين' },
        standard: { min: 850, max: 1400, warranty: 'شهر واحد', time: 'ساعة واحدة' },
        tip: 'لا تضغط على الشاشة المكسورة لتجنب تلف الحساسات الداخلية.'
    },
    battery: {
        name: 'بطارية / شحن',
        original: { min: 750, max: 1400, warranty: 'سنة كاملة', time: 'ساعة واحدة' },
        standard: { min: 350, max: 650, warranty: '3 شهور', time: 'ساعة واحدة' },
        tip: 'استخدم شواحن أصلية دائماً للحفاظ على عمر البطارية الجديد.'
    },
    board: {
        name: 'صيانة بوردة',
        original: { min: 1200, max: 3500, warranty: '3 شهور', time: '3-5 أيام' },
        standard: { min: 650, max: 1100, warranty: 'شهر واحد', time: '3-5 أيام' },
        tip: 'في حالة انسكاب سوائل، لا تحاول تشغيل الجهاز نهائياً.'
    },
    software: {
        name: 'سوفت وير / نسخة',
        original: { min: 150, max: 300, warranty: 'دعم فني شهر', time: 'ساعتين' },
        standard: { min: 100, max: 150, warranty: 'أسبوع واحد', time: 'ساعتين' },
        tip: 'تأكد من الاحتفاظ بنسخة احتياطية من ملفاتك الهامة.'
    },
    keyboard: {
        name: 'تغيير كيبورد',
        original: { min: 550, max: 1100, warranty: '6 شهور', time: 'ساعتين' },
        standard: { min: 300, max: 500, warranty: 'شهر واحد', time: 'ساعتين' },
        tip: 'تجنب انسكاب أي سوائل بالقرب من الكيبورد الجديد.'
    },
    upgrade: {
        name: 'تحديث (RAM/SSD)',
        original: { min: 800, max: 2500, warranty: 'سنتين', time: 'ساعة واحدة' },
        standard: { min: 400, max: 750, warranty: 'سنة واحدة', time: 'ساعة واحدة' },
        tip: 'التحديث إلى SSD يعتبر أهم خطوة لتسريع جهازك القديم.'
    }
};

window.selectDevice = function (type) {
    selectedStorage.type = type;
    const brands = {
        laptop: ['HP', 'Dell', 'Lenovo', 'Asus', 'Acer', 'MSI', 'SAMSUNG'],
        macbook: ['Air 13"', 'Pro 13"', 'Pro 14"', 'Pro 15"', 'Pro 16"'],
        desktop: ['Gaming PC', 'Workstation', 'Office PC', 'Custom Build'],
        'all-in-one': ['HP Envy', 'Dell Inspiron', 'Apple iMac', 'Lenovo Yoga']
    };
    const grid = document.getElementById('brand-grid');
    if (grid) {
        grid.innerHTML = brands[type].map(brand => `<div class="selection-item" onclick="selectBrand('${brand}')"><span>${brand}</span></div>`).join('');
    }
    goToStep('step-2');
};

window.selectBrand = function (brand) { selectedStorage.brand = brand; goToStep('step-3'); };
window.selectFault = function (fault) {
    selectedStorage.fault = fault; goToStep('step-analyzing');
    setTimeout(() => showResult(), 800);
};

window.toggleQuality = function () {
    selectedStorage.quality = selectedStorage.quality === 'original' ? 'standard' : 'original';
    const selector = document.getElementById('quality-selector');
    if (selector) selector.classList.toggle('standard');
    document.getElementById('q-original').classList.toggle('active');
    document.getElementById('q-standard').classList.toggle('active');
    updateResultDisplay();
};

window.updateEstimatorTotal = function() { updateResultDisplay(); };

function updateResultDisplay() {
    const f = faultDetails[selectedStorage.fault];
    const qData = f[selectedStorage.quality];
    let minPrice = qData.min, maxPrice = qData.max, timeStr = qData.time;
    const isUrgent = document.getElementById('urgent-repair') && document.getElementById('urgent-repair').checked;
    const isPickup = document.getElementById('home-pickup') && document.getElementById('home-pickup').checked;
    if (isUrgent) { minPrice = Math.round(minPrice * 1.2); maxPrice = Math.round(maxPrice * 1.2); timeStr = 'تسليم في نفس اليوم (عاجل)'; }
    if (isPickup) { minPrice += 50; maxPrice += 50; }
    document.getElementById('price-display').innerText = `${minPrice} - ${maxPrice} ج.م.`;
    document.getElementById('res-warranty').innerText = `الضمان: ${qData.warranty}`;
    document.getElementById('res-time').innerText = `الوقت: ${timeStr}`;
}

function showResult() {
    const f = faultDetails[selectedStorage.fault];
    updateResultDisplay();
    const typeMap = { laptop: 'لاب توب', macbook: 'ماك بوك', desktop: 'كمبيوتر مكتبي', 'all-in-one': 'جهاز All-in-One' };
    document.getElementById('res-device-info').innerText = `الجهاز: ${typeMap[selectedStorage.type]} (${selectedStorage.brand})`;
    document.getElementById('res-fault-info').innerText = `العطل: ${f.name}`;
    document.getElementById('tip-text').innerText = f.tip;
    goToStep('estimator-result');
    document.getElementById('estimator-nav').style.display = 'none';
}

function goToStep(stepId) {
    document.querySelectorAll('.estimator-step, .result-box').forEach(s => { s.classList.remove('active'); s.style.display = 'none'; });
    const target = document.getElementById(stepId);
    if (target) { target.style.display = 'block'; setTimeout(() => target.classList.add('active'), 10); if (stepId.startsWith('step-')) stepHistory.push(stepId); }
    updateStepper(stepId); updateNavButtons(stepId);
}

function updateStepper(stepId) {
    const stepMap = { 'step-1': 1, 'step-2': 2, 'step-3': 3, 'step-analyzing': 4, 'estimator-result': 4 };
    const currentStepNum = stepMap[stepId] || 1;
    document.querySelectorAll('.step-indicator').forEach((ind, idx) => { ind.classList.toggle('active', idx + 1 === currentStepNum); ind.classList.toggle('completed', idx + 1 < currentStepNum); });
}

function updateNavButtons(stepId) {
    const nav = document.getElementById('estimator-nav');
    if (nav) nav.style.display = (stepId === 'estimator-result' || stepId === 'step-analyzing') ? 'none' : 'flex';
    if (document.getElementById('btn-back')) document.getElementById('btn-back').style.visibility = (stepId === 'step-1') ? 'hidden' : 'visible';
}

window.goBack = function () { if (stepHistory.length > 1) { stepHistory.pop(); goToStep(stepHistory.pop()); } };
window.resetEstimator = function () { selectedStorage = { type: '', brand: '', fault: '', priceMin: 0, priceMax: 0, quality: 'original' }; stepHistory = []; goToStep('step-1'); };

window.bookRepair = async function () {
    const price = document.getElementById('price-display').innerText;
    const q = selectedStorage.quality === 'original' ? 'أصلي' : 'جودة عالية';
    const isUrgent = document.getElementById('urgent-repair') && document.getElementById('urgent-repair').checked;
    const isPickup = document.getElementById('home-pickup') && document.getElementById('home-pickup').checked;
    let extras = []; if (isUrgent) extras.push('صيانة عاجلة'); if (isPickup) extras.push('استلام من المنزل');
    const extrasText = extras.length > 0 ? ` [الإضافات: ${extras.join(' + ')}] ` : '';
    const inquiryData = { type: 'repair', device_type: selectedStorage.type, name: selectedStorage.brand, fault: selectedStorage.fault + extrasText, quality: q, estimate: price, status: 'new', created_at: new Date().toISOString() };
    const inquiries = JSON.parse(localStorage.getItem('yas_inquiries') || '[]'); inquiries.unshift(inquiryData); localStorage.setItem('yas_inquiries', JSON.stringify(inquiries));
    if(window.sendTelegramAlert) window.sendTelegramAlert(inquiryData);
    const msg = encodeURIComponent(`السلام عليكم YAS CITY، أود طلب صيانة (${selectedStorage.brand}). العطل: (${selectedStorage.fault}). الجودة: ${q}.${extrasText} التكلفة التقديرية: ${price}`);
    window.open(`https://wa.me/201147800144?text=${msg}`, '_blank');
};

// 360 Virtual Tour
const vrScenes = {
    "scene1": { "title": "بوابة شركة YAS", "type": "equirectangular", "panorama": "assets/images/vr1.jpeg", "autoLoad": true, "hfov": 110, "pitch": -3, "yaw": 117 },
    "scene2": { "title": "الرواق الداخلي", "type": "equirectangular", "panorama": "assets/images/vr2.jpeg", "autoLoad": true },
    "scene3": { "title": "مركز الصيانة", "type": "equirectangular", "panorama": "assets/images/vr3.jpeg", "autoLoad": true }
};

window.runTechScan = function() {
    const overlay = document.getElementById('scan-overlay'), status = document.getElementById('scan-status'), bar = document.getElementById('progress-bar-fill'), result = document.getElementById('scan-result');
    const stepsContainer = document.getElementById('scan-steps');
    if (!overlay || !status) return;
    result.style.display = 'none'; overlay.style.display = 'flex'; if(bar) bar.style.width = '0%';
    
    // Reset steps
    if(stepsContainer) {
        const steps = stepsContainer.querySelectorAll('.step');
        steps.forEach(step => step.classList.remove('active'));
    }
    
    const steps = [
        { text: "جاري التهيئة...", delay: 800, progress: 20, stepIndex: 0 },
        { text: "فحص المعالج...", delay: 1500, progress: 50, stepIndex: 1 },
        { text: "تحليل الرامات...", delay: 2500, progress: 70, stepIndex: 2 },
        { text: "فحص التخزين...", delay: 3200, progress: 85, stepIndex: 3 },
        { text: "تم التحليل", delay: 4000, progress: 100, stepIndex: 3 }
    ];
    
    steps.forEach(step => setTimeout(() => { 
        status.innerText = step.text; 
        if(bar) bar.style.width = step.progress + '%';
        if(stepsContainer) {
            const stepElements = stepsContainer.querySelectorAll('.step');
            if(stepElements[step.stepIndex]) {
                stepElements[step.stepIndex].classList.add('active');
            }
        }
    }, step.delay));
    
    setTimeout(() => { overlay.style.display = 'none'; calculateScanScore(); }, 4500);
};

function calculateScanScore() {
    const cpu = parseInt(document.getElementById('scan-cpu').value);
    const ram = parseInt(document.getElementById('scan-ram').value);
    const storage = document.getElementById('scan-storage').value;
    const age = parseInt(document.getElementById('scan-age').value);
    const gpu = parseInt(document.getElementById('scan-gpu').value);
    const temp = parseInt(document.getElementById('scan-temp').value);
    
    // Calculate individual component scores
    const cpuScore = Math.min(cpu * 5, 100);
    const ramScore = Math.min(ram * 3, 100);
    const storageScore = storage === 'nvme' ? 100 : (storage === 'ssd' ? 80 : (storage === 'hybrid' ? 60 : 30));
    const gpuScore = Math.min(gpu * 6, 100);
    const tempScore = temp * 10;
    
    // Calculate overall score
    let score = (cpuScore * 0.3) + (ramScore * 0.2) + (storageScore * 0.2) + (gpuScore * 0.2) + (tempScore * 0.1);
    score -= (age * 3);
    score = Math.min(Math.max(Math.round(score), 10), 99);
    
    // Display results
    document.getElementById('scan-result').style.display = 'block';
    document.getElementById('v-score').innerText = score + '%';
    
    // Update charts
    updateChart('cpu-chart', 'cpu-value', cpuScore);
    updateChart('ram-chart', 'ram-value', ramScore);
    updateChart('storage-chart', 'storage-value', storageScore);
    updateChart('gpu-chart', 'gpu-value', gpuScore);
    
    // Verdict and advice
    let verdict = score > 85 ? "أداء خارق (Legendary)" : (score > 70 ? "أداء ممتاز (Excellent)" : (score > 50 ? "أداء جيد (Good)" : (score > 35 ? "يحتاج تطوير (Fair)" : "أداء ضعيف (Poor)")));
    document.getElementById('v-verdict').innerText = verdict;
    
    const advice = document.getElementById('v-advice');
    const recommendationsList = document.getElementById('recommendations-list');
    
    if (advice) {
        if (score < 40) advice.innerText = "جهازك يحتاج لتحديث فوري ليعمل بشكل طبيعي.";
        else if (score < 60) advice.innerText = "الأداء متوسط، ننصح بعمل صيانة دورية وتحسين بعض القطع.";
        else if (score < 80) advice.innerText = "الأداء جيد، مع بعض التحسينات البسيطة سيكون ممتازاً.";
        else advice.innerText = "جهازك في حالة ممتازة! حافظ عليه بالصيانة الدورية.";
    }
    
    // Generate recommendations
    if(recommendationsList) {
        recommendationsList.innerHTML = '';
        const recommendations = [];
        
        if(cpuScore < 60) recommendations.push("ترقية المعالج لتحسين الأداء العام");
        if(ramScore < 60) recommendations.push("زيادة الرامات لتسريع تعدد المهام");
        if(storageScore < 70) recommendations.push("ترقية التخزين إلى NVMe SSD");
        if(gpuScore < 50) recommendations.push("ترقية كارت الشاشة للألعاب والرسوميات");
        if(tempScore < 60) recommendations.push("تحسين التبريد وتغيير المعجون الحراري");
        if(age > 5) recommendations.push("ننصح بعمل صيانة شاملة للجهاز القديم");
        if(score > 80) recommendations.push("الحفاظ على الصيانة الدورية كل 6 أشهر");
        
        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });
    }
}

function updateChart(chartId, valueId, percentage) {
    const chart = document.getElementById(chartId);
    const value = document.getElementById(valueId);
    if(chart) {
        setTimeout(() => {
            chart.style.width = percentage + '%';
        }, 100);
    }
    if(value) {
        value.textContent = percentage + '%';
    }
}

// Tech Counselor Tabs
window.switchSmartTab = function(tab) {
    document.querySelectorAll('.smart-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.s-tab').forEach(t => t.classList.remove('active'));
    
    if (tab === 'diagnosis') {
        const view = document.getElementById('view-diagnosis');
        if(view) view.classList.add('active');
        const tabBtn = document.querySelectorAll('.s-tab')[0];
        if(tabBtn) tabBtn.classList.add('active');
    } else {
        const view = document.getElementById('view-upgrade');
        if(view) view.classList.add('active');
        const tabBtn = document.querySelectorAll('.s-tab')[1];
        if(tabBtn) tabBtn.classList.add('active');
    }
};

window.calculateUpgrade = function() {
    const cpu = document.getElementById('up-cpu').value;
    const ram = document.getElementById('up-ram').value;
    const disk = document.getElementById('up-disk').value;
    const resBox = document.getElementById('upgrade-result');
    if(!resBox) return;
    
    let advice = "";
    let cost = 0;
    let boost = 0;

    if (disk === 'hdd') {
        advice += "<li>تغيير الهارد إلى <strong>SSD</strong> سيزيد سرعة الإقلاع 5 أضعاف.</li>";
        cost += 750;
        boost += 60;
    }
    if (parseInt(ram) <= 8) {
        advice += "<li>زيادة الرامات إلى <strong>16GB</strong> ستحسن تعدد المهام بشكل كبير.</li>";
        cost += 850;
        boost += 25;
    }
    if (cpu === 'old') {
        advice += "<li>المعالج قديم، ننصح بالنظر في خيار <strong>الاستبدال</strong> للحصول على أداء معاصر.</li>";
        boost += 5;
    }

    if (!advice) advice = "<li>جهازك ممتاز! ننصح فقط بعمل <strong>صيانة دورية</strong> وتغيير المعجون الحراري.</li>";

    resBox.innerHTML = `
        <h4 style="color:var(--accent-gold); margin-bottom:15px;">النتيجة المتوقعة:</h4>
        <div style="display:flex; gap:15px; margin-bottom:15px;">
            <div style="flex:1; background:rgba(255,255,255,0.05); padding:10px; border-radius:8px;"><span>زيادة الأداء:</span> <strong style="color:#2ecc71;">+${boost}%</strong></div>
            <div style="flex:1; background:rgba(255,255,255,0.05); padding:10px; border-radius:8px;"><span>التكلفة:</span> <strong>${cost} ج.م.</strong></div>
        </div>
        <ul style="text-align:right; padding-right:20px; color:#ccc;">${advice}</ul>
        <button class="cta-button w-100 mt-3" onclick="contactCounselor('upgrade')">
            <i class="fab fa-whatsapp"></i> اطلب هذه التحديثات الآن
        </button>
    `;
    resBox.style.display = 'block';
};

window.contactCounselor = function(type) {
    let msg = "";
    if (type === 'diagnosis') {
        const score = document.getElementById('v-score').innerText;
        msg = `مرحباً YAS CITY، قمت بعمل فحص لجهازي وحصلت على تقييم (${score}). أود حجز موعد صيانة.`;
    } else {
        msg = `مرحباً YAS CITY، أود الاستفسار عن باقات تحديث اللابتوب (RAM/SSD) المتوفرة لديكم.`;
    }
    window.open(`https://wa.me/201147800144?text=${encodeURIComponent(msg)}`, '_blank');
};


// PC Matchmaker Quiz Logic
let quizSelected = { usage: '', budget: '', portability: '' };
let quizHistory = ['q-step-1'];

window.switchQuizMode = function(mode) {
    const stepper = document.querySelector('.quiz-stepper');
    const nav = document.getElementById('quiz-nav');
    const compareView = document.getElementById('compare-view');
    const tabs = document.querySelectorAll('.util-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (mode === 'quiz') {
        if(stepper) stepper.style.display = 'flex';
        if(nav) nav.style.display = 'flex';
        if(tabs[0]) tabs[0].classList.add('active');
        goToQuizStep('q-step-1');
    } else {
        if(stepper) stepper.style.display = 'none';
        if(nav) nav.style.display = 'none';
        if(tabs[1]) tabs[1].classList.add('active');
        goToQuizStep('compare-view');
    }
};

window.selectQuizOption = function(key, value) {
    quizSelected[key] = value;
    const currentStepId = quizHistory[quizHistory.length - 1];
    const stepNum = parseInt(currentStepId.split('-').pop());

    if (stepNum < 6) {
        goToQuizStep(`q-step-${stepNum + 1}`);
    } else {
        goToQuizStep('q-step-analyzing');
        setTimeout(() => showQuizResult(), 2500);
    }
};

function goToQuizStep(stepId) {
    document.querySelectorAll('.quiz-step, .quiz-result-card').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    const target = document.getElementById(stepId);
    if (target) {
        target.style.display = 'block';
        setTimeout(() => target.classList.add('active'), 10);
        if (stepId.startsWith('q-step-') && stepId !== 'q-step-analyzing') quizHistory.push(stepId);
    }
    updateQuizStepper(stepId);
}

function updateQuizStepper(stepId) {
    const stepMap = { 'q-step-1': 1, 'q-step-2': 2, 'q-step-3': 3, 'q-step-4': 4, 'q-step-5': 5, 'q-step-6': 6, 'q-step-analyzing': 7, 'quiz-result': 7 };
    const num = stepMap[stepId] || 1;
    document.querySelectorAll('.q-step').forEach((ind, idx) => {
        ind.classList.toggle('active', idx + 1 === num);
        ind.classList.toggle('completed', idx + 1 < num);
    });
    const nav = document.getElementById('quiz-nav');
    if (nav) nav.style.display = (stepId === 'quiz-result' || stepId === 'q-step-analyzing') ? 'none' : 'flex';
    const backBtn = document.getElementById('q-btn-back');
    if (backBtn) backBtn.style.visibility = (stepId === 'q-step-1') ? 'hidden' : 'visible';
}

window.goBackQuiz = function() {
    if (quizHistory.length > 1) {
        quizHistory.pop();
        goToQuizStep(quizHistory.pop());
    }
};

window.resetQuiz = function() {
    quizSelected = { usage: '', budget: '', portability: '' };
    quizHistory = [];
    goToQuizStep('q-step-1');
};

function showQuizResult() {
    const recommendations = {
        // Student + Economy + High Portability
        'student_economy_high': { name: 'Dell Latitude 7480', power: 65, gaming: 30, battery: 85, img: 'laptop1.png', specs: ['Core i5-7th Gen', '8GB RAM', '256GB SSD', 'Ultra Portable'] },
        // Student + Economy + Mid Portability
        'student_economy_mid': { name: 'HP ProBook 450 G7', power: 70, gaming: 35, battery: 80, img: 'laptop2.png', specs: ['Core i5-10th Gen', '8GB RAM', '512GB SSD', '15.6" FHD'] },
        // Student + Economy + Low Portability
        'student_economy_low': { name: 'Lenovo ThinkPad E15', power: 72, gaming: 38, battery: 78, img: 'laptop3.png', specs: ['Core i5-11th Gen', '8GB RAM', '512GB SSD', '15.6" IPS'] },
        
        // Gaming + Premium + Low Portability
        'gaming_premium_low': { name: 'HP Victus 15', power: 95, gaming: 92, battery: 60, img: 'laptop2.png', specs: ['Core i7-12th Gen', '16GB RAM', 'RTX 3050', '144Hz Screen'] },
        // Gaming + Premium + Mid Portability
        'gaming_premium_mid': { name: 'ASUS ROG Strix G15', power: 98, gaming: 95, battery: 55, img: 'laptop1.png', specs: ['Ryzen 7 5800H', '16GB RAM', 'RTX 3060', '165Hz Screen'] },
        // Gaming + Ultra + Low Portability
        'gaming_ultra_low': { name: 'Alienware m15 R7', power: 100, gaming: 98, battery: 50, img: 'laptop3.png', specs: ['Core i9-12th Gen', '32GB RAM', 'RTX 3080', '240Hz OLED'] },
        
        // Business + Mid + High Portability
        'business_mid_high': { name: 'Dell Latitude 7420', power: 88, gaming: 55, battery: 90, img: 'laptop3.png', specs: ['Core i7-11th Gen', '16GB RAM', 'Iris Xe Graphics', 'Long Battery'] },
        // Business + Premium + High Portability
        'business_premium_high': { name: 'MacBook Pro 14"', power: 92, gaming: 60, battery: 95, img: 'laptop1.png', specs: ['M2 Pro Chip', '16GB RAM', '512GB SSD', 'Liquid Retina XDR'] },
        // Business + Premium + Mid Portability
        'business_premium_mid': { name: 'ThinkPad X1 Carbon', power: 90, gaming: 45, battery: 92, img: 'laptop2.png', specs: ['Core i7-12th Gen', '16GB RAM', '1TB SSD', 'Carbon Fiber'] },
        
        // Design + Premium + Mid Portability
        'design_premium_mid': { name: 'MacBook Pro 16"', power: 98, gaming: 65, battery: 88, img: 'laptop1.png', specs: ['M2 Max Chip', '32GB RAM', '1TB SSD', '16.2" Liquid Retina'] },
        // Design + Ultra + Low Portability
        'design_ultra_low': { name: 'MSI Creator Z17', power: 100, gaming: 85, battery: 70, img: 'laptop3.png', specs: ['Core i9-13th Gen', '64GB RAM', 'RTX 4080', '17.3" 4K Touch'] },
        
        // Programming + Mid + High Portability
        'programming_mid_high': { name: 'MacBook Air M2', power: 85, gaming: 40, battery: 95, img: 'laptop2.png', specs: ['M2 Chip', '16GB RAM', '512GB SSD', '13.6" Liquid Retina'] },
        // Programming + Premium + Mid Portability
        'programming_premium_mid': { name: 'Framework Laptop 16"', power: 92, gaming: 70, battery: 75, img: 'laptop1.png', specs: ['Ryzen 7 7840HS', '32GB RAM', '1TB SSD', 'Upgradeable'] },
        
        // Default fallback
        'default': { name: 'HP EliteBook 840 G6', power: 75, gaming: 40, battery: 80, img: 'laptop1.png', specs: ['Core i5-8th Gen', '16GB RAM', '512GB SSD', 'Metal Body'] }
    };

    // Create recommendation key based on all selected parameters
    const key = `${quizSelected.usage}_${quizSelected.budget}_${quizSelected.portability}`;
    let match = recommendations[key];
    
    // If no exact match, try partial matches
    if (!match) {
        const partialKey = `${quizSelected.usage}_${quizSelected.budget}`;
        match = recommendations[partialKey + '_mid'] || recommendations[partialKey + '_high'] || recommendations[partialKey + '_low'];
    }
    
    // Final fallback
    if (!match) {
        match = recommendations['default'];
    }

    // Adjust scores based on additional preferences
    let adjustedPower = match.power;
    let adjustedGaming = match.gaming;
    let adjustedBattery = match.battery;
    
    if (quizSelected.performance === 'speed') {
        adjustedPower = Math.min(match.power + 10, 100);
    } else if (quizSelected.performance === 'battery') {
        adjustedBattery = Math.min(match.battery + 10, 100);
    } else if (quizSelected.performance === 'graphics') {
        adjustedGaming = Math.min(match.gaming + 10, 100);
    }
    
    // OS preference adjustment
    if (quizSelected.os === 'mac' && !match.name.includes('Mac')) {
        // Suggest MacBook if user prefers macOS
        match = recommendations['business_premium_high'];
    } else if (quizSelected.os === 'linux' && match.name.includes('Mac')) {
        // Suggest Linux-compatible alternative
        match = recommendations['programming_premium_mid'];
    }

    if(document.getElementById('match-name')) document.getElementById('match-name').innerText = match.name;
    if(document.getElementById('score-power')) document.getElementById('score-power').style.width = adjustedPower + '%';
    if(document.getElementById('score-gaming')) document.getElementById('score-gaming').style.width = adjustedGaming + '%';
    if(document.getElementById('score-battery')) document.getElementById('score-battery').style.width = adjustedBattery + '%';
    if(document.getElementById('match-img')) document.getElementById('match-img').src = 'assets/images/' + match.img;
    if(document.getElementById('match-specs')) {
        document.getElementById('match-specs').innerHTML = match.specs.map(s => `<li><i class="fas fa-check"></i> ${s}</li>`).join('');
    }

    goToQuizStep('quiz-result');
}

window.contactMatch = function() {
    const name = document.getElementById('match-name').innerText;
    const msg = encodeURIComponent(`مرحباً YAS CITY، قمت بعمل اختبار الجهاز المثالي وظهر لي جهاز (${name}). هل هو متوفر حالياً؟`);
    window.open(`https://wa.me/201158986999?text=${msg}`, '_blank');
};

// Device Request Form Functions
window.showContactForm = function() {
    const form = document.getElementById('contact-form-modal');
    const deviceName = document.getElementById('match-name').innerText;
    const deviceSpecs = document.getElementById('match-specs').innerText;
    
    document.getElementById('summary-device-name').innerText = deviceName;
    document.getElementById('summary-device-specs').innerText = deviceSpecs;
    form.style.display = 'block';
};

window.hideContactForm = function() {
    document.getElementById('contact-form-modal').style.display = 'none';
};

window.submitDeviceRequest = async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const email = document.getElementById('customer-email').value;
    const address = document.getElementById('customer-address').value;
    const notes = document.getElementById('customer-notes').value;
    const deviceName = document.getElementById('match-name').innerText;
    const deviceSpecs = document.getElementById('match-specs').innerText;
    
    const requestData = {
        id: Date.now(),
        type: 'device_request',
        name: name,
        phone: phone,
        email: email,
        address: address,
        notes: notes,
        device_name: deviceName,
        device_type: deviceName,
        device_specs: deviceSpecs,
        quiz_answers: quizSelected,
        created_at: new Date().toISOString(),
        status: 'new'
    };
    
    // Save to localStorage
    try {
        let inquiries = JSON.parse(localStorage.getItem('yas_inquiries') || '[]');
        inquiries.unshift(requestData);
        localStorage.setItem('yas_inquiries', JSON.stringify(inquiries));
    } catch(e) {
        console.error('Local storage error:', e);
    }
    
    // Try to save to Supabase
    if (window.yasDb) {
        try {
            const { data, error } = await window.yasDb.from('inquiries').insert([requestData]);
            if (error) throw error;
        } catch(e) {
            console.warn('Supabase save failed, using local storage:', e);
        }
    }
    
    // Send notification
    window.sendTelegramAlert({
        name: name,
        phone: phone,
        type: 'device_request',
        device_name: deviceName,
        message: `طلب جهاز: ${deviceName} - ${notes || 'لا توجد ملاحظات'}`
    });
    
    // Show success message
    alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
    hideContactForm();
    document.getElementById('device-request-form').reset();
};

// openTradeIn → assets/js/trade-in.js

function starsFromScore(score) {
    const n = Math.min(5, Math.max(1, Math.round(score / 20)));
    return '⭐'.repeat(n);
}

function fillCompareCell(id, value, score) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `<span class="spec-value">${value}</span><span class="spec-rating">${starsFromScore(score || 70)}</span>`;
}

function fillCompareHeader(id, device) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `<div class="device-header-content"><span class="device-name">${device.name}</span><span class="device-score">${device.score}/100</span></div>`;
}

// AI Comparison Logic (uses devices-db.js)
window.startAIComparison = function() {
    const d1Name = document.getElementById('compare-1-ai').value.trim();
    const d2Name = document.getElementById('compare-2-ai').value.trim();
    if (!d1Name || !d2Name) {
        return alert(currentLang === 'ar' ? 'يرجى إدخال أسماء الأجهزة للمقارنة' : 'Please enter device names to compare');
    }

    const loader = document.getElementById('ai-comparison-loader');
    const result = document.getElementById('comparison-result');
    if (loader) loader.style.display = 'block';
    if (result) result.style.display = 'none';

    setTimeout(() => {
        if (loader) loader.style.display = 'none';

        const cmp = window.compareDevices ? window.compareDevices(d1Name, d2Name) : null;
        if (!cmp) return;

        const { device1: dev1, device2: dev2, winner, verdict } = cmp;

        fillCompareHeader('th-name-1', dev1);
        fillCompareHeader('th-name-2', dev2);
        fillCompareCell('td-cpu-1', dev1.cpu, dev1.score);
        fillCompareCell('td-cpu-2', dev2.cpu, dev2.score);
        fillCompareCell('td-ram-1', dev1.ram, dev1.score);
        fillCompareCell('td-ram-2', dev2.ram, dev2.score);
        fillCompareCell('td-storage-1', dev1.storage, dev1.score);
        fillCompareCell('td-storage-2', dev2.storage, dev2.score);
        fillCompareCell('td-gpu-1', dev1.gpu, dev1.score);
        fillCompareCell('td-gpu-2', dev2.gpu, dev2.score);
        fillCompareCell('td-battery-1', dev1.battery, dev1.score);
        fillCompareCell('td-battery-2', dev2.battery, dev2.score);
        fillCompareCell('td-weight-1', dev1.weight, dev1.score);
        fillCompareCell('td-weight-2', dev2.weight, dev2.score);
        fillCompareCell('td-price-1', `EGP ${dev1.price.toLocaleString('ar-EG')}`, dev1.score);
        fillCompareCell('td-price-2', `EGP ${dev2.price.toLocaleString('ar-EG')}`, dev2.score);

        const badge = document.getElementById('winner-name');
        if (badge) badge.textContent = winner.name;
        const verdictEl = document.getElementById('comparison-verdict-text');
        if (verdictEl) verdictEl.textContent = verdict;

        if (document.getElementById('score-1')) document.getElementById('score-1').textContent = dev1.score + '/100';
        if (document.getElementById('score-2')) document.getElementById('score-2').textContent = dev2.score + '/100';
        if (result) result.style.display = 'block';

        if (window.saveInquiry) {
            window.saveInquiry({
                type: 'matchmaker',
                name: 'زائر الموقع',
                device_type: `${dev1.name} vs ${dev2.name}`,
                message: verdict,
                estimate: `فائز: ${winner.name}`
            });
        }

        showToast(currentLang === 'ar' ? 'تم تحليل الأجهزة بنجاح!' : 'Devices analyzed successfully!');
    }, 1500);
};

window.resetComparison = function() {
    ['compare-1-ai', 'compare-2-ai'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const result = document.getElementById('comparison-result');
    if (result) result.style.display = 'none';
};

// Device name autocomplete for comparison
function initDeviceSuggestions() {
    [['compare-1-ai', 'suggestions-1'], ['compare-2-ai', 'suggestions-2']].forEach(([inputId, boxId]) => {
        const input = document.getElementById(inputId);
        const box = document.getElementById(boxId);
        if (!input || !box) return;

        input.addEventListener('input', () => {
            const list = window.searchDeviceSuggestions ? window.searchDeviceSuggestions(input.value, 5) : [];
            if (!list.length) { box.innerHTML = ''; box.style.display = 'none'; return; }
            box.innerHTML = list.map(d =>
                `<button type="button" class="suggestion-item">${d.name}</button>`
            ).join('');
            box.style.display = 'block';
            box.querySelectorAll('.suggestion-item').forEach(btn => {
                btn.addEventListener('click', () => {
                    input.value = btn.textContent;
                    box.innerHTML = '';
                    box.style.display = 'none';
                });
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initDeviceSuggestions);

window.contactCompare = function() {
    const d1 = document.getElementById('compare-1-ai')?.value.trim() || 'جهاز 1';
    const d2 = document.getElementById('compare-2-ai')?.value.trim() || 'جهاز 2';
    const msg = `مرحباً YAS CITY، أود الاستفسار عن أسعار الأجهزة التالية: (${d1}) و (${d2})`;
    if (window.openWhatsApp) window.openWhatsApp('201158986999', msg);
    else window.open(`https://wa.me/201158986999?text=${encodeURIComponent(msg)}`, '_blank');
};
