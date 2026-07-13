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

    const message = `🔔 *طلب جديد YAS CITY*\n` +
                `👤 العميل: ${data.name || 'عميل'}\n` +
                `📞 الهاتف/الواتس: ${data.phone || 'غير مسجل'}\n` +
                `💻 القسم: ${data.type === 'repair' ? 'صيانة' : 'مبيعات'}\n` +
                `📍 التفاصيل: ${data.fault || data.message || data.device_type || 'استفسار عام'}\n` +
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

// AI Assistant
let diagState = null;
window.toggleAIChat = () => { const chat = document.getElementById('ai-chat-window'); if (chat) chat.classList.toggle('active'); };
window.sendAIQuery = (queryOverride) => {
    const input = document.getElementById('ai-user-query');
    const query = (queryOverride || (input ? input.value : '')).trim();
    if (!query) return;
    addChatMessage(query, 'user-msg'); if (input) input.value = '';
    setTimeout(() => {
        let response = `أهلاً بك! بخصوص "${query}" ، يمكننا مساعدتك. تواصل معنا عبر الواتساب: 01158986999.`;
        if (typeof processAIQuery === 'function') response = processAIQuery(query.toLowerCase());
        addChatMessage(response, 'ai-msg');
    }, 800);
};
function processAIQuery(q) {
    if (q.includes('تشخيص')) { diagState = 'start'; return 'حسناً، فلنبدأ تشخيص العطل. هل الجهاز يعمل (يفتح شاشة) أم متوقف تماماً عن العمل؟'; }
    if (diagState === 'start') { if (q.includes('يعمل') || q.includes('شاشة')) { diagState = 'working'; return 'جيد. هل المشكلة في بطء الجهاز أم أن هناك رسائل خطأ تظهر لك؟'; } else { diagState = 'dead'; return 'في هذه الحالة، قد تكون المشكلة في دائرة الباور أو البطارية. تواصل مع فني الصيانة: <br><a href="https://wa.me/201147800144" target="_blank" style="color:var(--accent-gold); font-weight:bold;">01147800144</a>'; } }
    if (q.includes('صيانة') || q.includes('عطل')) return 'نحن متميزون في صيانة البوردة والشاشات. تواصل معنا: 01147800144';
    return 'أهلاً بك! أنا مساعد YAS الذكي. يمكنك طلب "تشخيص" عطل أو الاستفسار عن "صيانة" (01147800144).';
}
window.addChatMessage = function(text, className) {
    const msgContainer = document.getElementById('ai-chat-messages'); if (!msgContainer) return;
    const msgDiv = document.createElement('div'); msgDiv.className = `message ${className}`; msgDiv.innerHTML = text;
    msgContainer.appendChild(msgDiv); msgContainer.scrollTop = msgContainer.scrollHeight;
};

// 360 Virtual Tour
const vrScenes = {
    "scene1": { "title": "بوابة شركة YAS", "type": "equirectangular", "panorama": "vr1.jpeg", "autoLoad": true, "hfov": 110, "pitch": -3, "yaw": 117 },
    "scene2": { "title": "الرواق الداخلي", "type": "equirectangular", "panorama": "vr2.jpeg", "autoLoad": true },
    "scene3": { "title": "مركز الصيانة", "type": "equirectangular", "panorama": "vr3.jpeg", "autoLoad": true }
};

window.runTechScan = function() {
    const overlay = document.getElementById('scan-overlay'), status = document.getElementById('scan-status'), bar = document.getElementById('progress-bar-fill'), result = document.getElementById('scan-result');
    if (!overlay || !status) return;
    result.style.display = 'none'; overlay.style.display = 'flex'; if(bar) bar.style.width = '0%';
    const steps = [{ text: "INITIALIZING...", delay: 800, progress: 20 }, { text: "SCANNING CPU...", delay: 1500, progress: 50 }, { text: "ANALYZING...", delay: 2500, progress: 80 }, { text: "DONE", delay: 3500, progress: 100 }];
    steps.forEach(step => setTimeout(() => { status.innerText = step.text; if(bar) bar.style.width = step.progress + '%'; }, step.delay));
    setTimeout(() => { overlay.style.display = 'none'; calculateScanScore(); }, 4000);
};

function calculateScanScore() {
    const cpu = parseInt(document.getElementById('scan-cpu').value), ram = parseInt(document.getElementById('scan-ram').value), storage = document.getElementById('scan-storage').value, age = parseInt(document.getElementById('scan-age').value);
    let score = (cpu * 4) + (ram * 1.5); score += (storage === 'nvme' ? 15 : (storage === 'ssd' ? 10 : -10)); score -= (age * 5); score = Math.min(Math.max(Math.round(score), 10), 99);
    document.getElementById('scan-result').style.display = 'block'; document.getElementById('v-score').innerText = score + '%';
    let verdict = score > 85 ? "أداء خارق (Legendary)" : (score > 60 ? "أداء جيد (Solid)" : (score > 35 ? "يحتاج تطوير" : "أداء ضعيف"));
    document.getElementById('v-verdict').innerText = verdict;
    
    const advice = document.getElementById('v-advice');
    if (advice) {
        if (score < 40) advice.innerText = "جهازك يحتاج لتحديث فوري (SSD/RAM) ليعمل بشكل طبيعي.";
        else if (score < 70) advice.innerText = "الأداء متوسط، ننصح بعمل صيانة دورية وتغيير المعجون الحراري.";
        else advice.innerText = "جهازك في حالة ممتازة! حافظ عليه بالصيانة الدورية كل 6 أشهر.";
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

    if (stepNum < 3) {
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
    const stepMap = { 'q-step-1': 1, 'q-step-2': 2, 'q-step-3': 3, 'q-step-analyzing': 4, 'quiz-result': 4 };
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
        'student_economy_high': { name: 'Dell Latitude 7480', power: 65, gaming: 30, battery: 85, img: 'laptop1.png', specs: ['Core i5-7th Gen', '8GB RAM', '256GB SSD', 'Ultra Portable'] },
        'gaming_premium_low': { name: 'HP Victus 15', power: 95, gaming: 92, battery: 60, img: 'laptop2.png', specs: ['Core i7-12th Gen', '16GB RAM', 'RTX 3050', '144Hz Screen'] },
        'business_mid_high': { name: 'Dell Latitude 7420', power: 88, gaming: 55, battery: 90, img: 'laptop3.png', specs: ['Core i7-11th Gen', '16GB RAM', 'Iris Xe Graphics', 'Long Battery'] },
        'default': { name: 'HP EliteBook 840 G6', power: 75, gaming: 40, battery: 80, img: 'laptop1.png', specs: ['Core i5-8th Gen', '16GB RAM', '512GB SSD', 'Metal Body'] }
    };

    const key = `${quizSelected.usage}_${quizSelected.budget}_${quizSelected.portability}`;
    const match = recommendations[key] || recommendations['default'];

    if(document.getElementById('match-name')) document.getElementById('match-name').innerText = match.name;
    if(document.getElementById('score-power')) document.getElementById('score-power').style.width = match.power + '%';
    if(document.getElementById('score-gaming')) document.getElementById('score-gaming').style.width = match.gaming + '%';
    if(document.getElementById('score-battery')) document.getElementById('score-battery').style.width = match.battery + '%';
    if(document.getElementById('match-img')) document.getElementById('match-img').src = match.img;
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

window.openTradeIn = function() {
    alert(currentLang === 'ar' ? 'خدمة الاستبدال متاحة قريباً! تواصل معنا لتقييم جهازك الحالي.' : 'Trade-in service coming soon! Contact us to appraise your current device.');
};

// AI Comparison Logic
window.startAIComparison = function() {
    const d1 = document.getElementById('compare-1-ai').value.trim();
    const d2 = document.getElementById('compare-2-ai').value.trim();
    if(!d1 || !d2) return alert(currentLang === 'ar' ? 'يرجى إدخال أسماء الأجهزة للمقارنة' : 'Please enter device names to compare');

    const loader = document.getElementById('ai-comparison-loader');
    if(loader) loader.style.display = 'block';

    setTimeout(() => {
        if(loader) loader.style.display = 'none';
        
        // Mocking AI Data Update
        if(document.getElementById('th-name-1')) document.getElementById('th-name-1').innerText = d1;
        if(document.getElementById('th-name-2')) document.getElementById('th-name-2').innerText = d2;
        
        // Randomize some values for demo
        const s1 = 60 + Math.floor(Math.random() * 35);
        const s2 = 60 + Math.floor(Math.random() * 35);
        
        if(document.getElementById('lbl-score-1')) document.getElementById('lbl-score-1').innerText = s1 + '%';
        if(document.getElementById('lbl-score-2')) document.getElementById('lbl-score-2').innerText = s2 + '%';
        if(document.getElementById('bar-score-1')) document.getElementById('bar-score-1').style.width = s1 + '%';
        if(document.getElementById('bar-score-2')) document.getElementById('bar-score-2').style.width = s2 + '%';
        
        showToast(currentLang === 'ar' ? 'تم تحليل الأجهزة بنجاح!' : 'Devices analyzed successfully!');
    }, 3000);
};

window.contactCompare = function() {
    const d1 = document.getElementById('th-name-1').innerText;
    const d2 = document.getElementById('th-name-2').innerText;
    const msg = encodeURIComponent(`مرحباً YAS CITY، أود الاستفسار عن أسعار الأجهزة التالية: (${d1}) و (${d2})`);
    window.open(`https://wa.me/201158986999?text=${msg}`, '_blank');
};
