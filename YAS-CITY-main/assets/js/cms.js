// YAS CITY Simple CMS System
// Content Management System for managing website content

class YASCMS {
    constructor() {
        this.content = this.loadContent();
        this.supabase = window.yasDb;
    }

    // Load content from localStorage or Supabase
    loadContent() {
        const localContent = localStorage.getItem('yas_cms_content');
        if (localContent) {
            return JSON.parse(localContent);
        }
        return this.getDefaultContent();
    }

    // Default content structure
    getDefaultContent() {
        return {
            hero: {
                title: 'مرحباً بك في شركة YAS',
                subtitle: 'التميز والابتكار في كل خطوة',
                buttonText: 'اكتشف المزيد'
            },
            about: {
                title: 'من نحن',
                paragraph1: 'شركة YAS هي شركة رائدة في مجالها، ملتزمة بتقديم أفضل الخدمات والمنتجات لعملائنا.',
                paragraph2: 'مع فريق من المحترفين المتميزين وخبرة تمتد لسنوات، نسعى دائماً لتحقيق التميز وتجاوز توقعات عملائنا.'
            },
            services: [
                {
                    id: 1,
                    title: 'قسم الصيانة',
                    description: 'نقدم خدمات صيانة شاملة ومتكاملة لضمان استمرارية وكفاءة عملك بأعلى المعايير',
                    icon: '🛠️'
                },
                {
                    id: 2,
                    title: 'قسم الأونلاين',
                    description: 'إدارة وتطوير تواجدك الرقمي وتقديم حلول متكاملة في التجارة الإلكترونية',
                    icon: '🌐'
                },
                {
                    id: 3,
                    title: 'قسم المبيعات',
                    description: 'توفير أفضل المنتجات والحلول مع فريق مبيعات متميز لتلبية جميع احتياجاتك',
                    icon: '🛒'
                }
            ],
            contact: {
                address: 'دمياط - الزرقا - كفر المياسرة',
                phone: '+20 11 47800144',
                email: 'info@yascity.com'
            },
            social: {
                facebook: 'https://www.facebook.com/yastechegypt?locale=ar_AR',
                whatsapp: 'https://wa.me/201147800144'
            },
            reviews: [
                { id: 1, name: 'أحمد محمود', role: 'عميل صيانة', rating: 5, text: 'أصلحوا بوردة اللابتوب اللي محد قدر يصلحها. شغل محترف وضمان حقيقي.' },
                { id: 2, name: 'سارة علي', role: 'عميلة مبيعات', rating: 5, text: 'اشتريت MacBook مستعمل بحالة ممتازة بسعر مناسب. فريق المبيعات متعاون جداً.' },
                { id: 3, name: 'محمد حسن', role: 'عميل صيانة', rating: 5, text: 'أسرع مركز صيانة في دمياط. فحص مجاني وتوضيح كامل قبل أي إصلاح.' },
                { id: 4, name: 'نور الدين', role: 'عميل أونلاين', rating: 4, text: 'خدمة العملاء سريعة والرد على الواتساب فوري. أنصح بيهم.' }
            ]
        };
    }

    // Save content to localStorage and optionally to Supabase
    async saveContent(content) {
        this.content = content;
        localStorage.setItem('yas_cms_content', JSON.stringify(content));

        if (this.supabase) {
            try {
                const { data, error } = await this.supabase
                    .from('cms_content')
                    .upsert({ id: 1, content: JSON.stringify(content) });
                
                if (error) throw error;
                return { success: true, message: 'تم حفظ المحتوى بنجاح' };
            } catch (error) {
                console.error('Error saving to Supabase:', error);
                return { success: false, message: 'تم الحفظ محلياً فقط' };
            }
        }
        return { success: true, message: 'تم حفظ المحتوى محلياً' };
    }

    // Get specific content section
    getContent(section) {
        return this.content[section] || null;
    }

    // Update specific content section
    updateContent(section, data) {
        this.content[section] = data;
        return this.saveContent(this.content);
    }

    // Add service
    addService(service) {
        this.content.services.push({
            id: Date.now(),
            ...service
        });
        return this.saveContent(this.content);
    }

    // Update service
    updateService(id, serviceData) {
        const index = this.content.services.findIndex(s => s.id === id);
        if (index !== -1) {
            this.content.services[index] = { ...this.content.services[index], ...serviceData };
            return this.saveContent(this.content);
        }
        return { success: false, message: 'الخدمة غير موجودة' };
    }

    // Delete service
    deleteService(id) {
        this.content.services = this.content.services.filter(s => s.id !== id);
        return this.saveContent(this.content);
    }

    // Update hero section
    updateHero(heroData) {
        this.content.hero = { ...this.content.hero, ...heroData };
        return this.saveContent(this.content);
    }

    // Update about section
    updateAbout(aboutData) {
        this.content.about = { ...this.content.about, ...aboutData };
        return this.saveContent(this.content);
    }

    // Update contact info
    updateContact(contactData) {
        this.content.contact = { ...this.content.contact, ...contactData };
        return this.saveContent(this.content);
    }

    // Update social links
    updateSocial(socialData) {
        this.content.social = { ...this.content.social, ...socialData };
        return this.saveContent(this.content);
    }

    updateReviews(reviews) {
        this.content.reviews = reviews;
        return this.saveContent(this.content);
    }

    addReview(review) {
        if (!this.content.reviews) this.content.reviews = [];
        this.content.reviews.push({ id: Date.now(), ...review });
        return this.saveContent(this.content);
    }

    // Export content as JSON
    exportContent() {
        return JSON.stringify(this.content, null, 2);
    }

    // Import content from JSON
    importContent(jsonString) {
        try {
            const content = JSON.parse(jsonString);
            this.content = content;
            return this.saveContent(this.content);
        } catch (error) {
            return { success: false, message: 'خطأ في قراءة الملف' };
        }
    }
}

// Initialize CMS
window.yasCMS = new YASCMS();

// Auto-load content on page load
document.addEventListener('DOMContentLoaded', () => {
    const cms = window.yasCMS;
    
    // Apply content to page elements if they exist
    const heroTitle = document.querySelector('[data-cms="hero-title"]');
    const heroSubtitle = document.querySelector('[data-cms="hero-subtitle"]');
    
    if (heroTitle && cms.content.hero.title) {
        heroTitle.textContent = cms.content.hero.title;
    }
    if (heroSubtitle && cms.content.hero.subtitle) {
        heroSubtitle.textContent = cms.content.hero.subtitle;
    }

    renderReviews(cms.content.reviews);
});

function renderReviews(reviews) {
    const grid = document.getElementById('reviews-grid');
    if (!grid || !reviews || !reviews.length) return;

    grid.innerHTML = reviews.map(r => {
        const stars = '★'.repeat(r.rating || 5) + '☆'.repeat(5 - (r.rating || 5));
        return `<article class="review-card" data-aos="fade-up">
            <div class="review-stars" aria-label="${r.rating} من 5">${stars}</div>
            <p class="review-text">"${r.text}"</p>
            <div class="review-author">
                <strong>${r.name}</strong>
                <span>${r.role || 'عميل'}</span>
            </div>
        </article>`;
    }).join('');
}

window.renderReviews = renderReviews;
