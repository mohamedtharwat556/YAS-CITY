# YAS CITY

موقع ويب احترافي لشركة **YAS CITY** — صيانة لابتوب، مبيعات أجهزة، وخدمة عملاء ذكية.

**الموقع المباشر:** [https://yas-city.vercel.app](https://yas-city.vercel.app)  
**المستودع:** [https://github.com/mohamedtharwat556/YAS-CITY](https://github.com/mohamedtharwat556/YAS-CITY)

---

## المميزات

- تصميم عصري متجاوب مع دعم RTL للعربية
- صفحة رئيسية غنية: معرض صور، فحص تقني، مطابقة أجهزة، جولة 360°
- بوابة صيانة لفريق الفنيين
- خدمة عملاء مع شات بوت
- لوحة تحكم إدارية (Dashboard) مع CMS
- تكامل Supabase للبيانات والمصادقة
- API Serverless على Vercel
- PWA + Service Worker للعمل offline جزئياً
- SEO: sitemap، robots، Schema.org، Google Analytics (اختياري)

---

## هيكل المشروع

```
YAS-CITY/
├── index.html              # الصفحة الرئيسية
├── maintenance.html        # فريق الصيانة
├── customer-service.html   # خدمة العملاء
├── online.html             # قسم الأونلاين
├── login.html              # تسجيل دخول الإدارة
├── dashboard.html          # لوحة التحكم
├── config.js               # إعدادات Supabase + الموقع + Analytics
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── sitemap.xml             # خريطة الموقع لمحركات البحث
├── robots.txt              # تعليمات الزحف
├── vercel.json             # إعدادات النشر على Vercel
├── package.json
├── api/
│   ├── auth/login.js       # مصادقة Supabase
│   ├── chat.js             # شات بوت (AI mock)
│   ├── public-config.js    # إعدادات عامة (Analytics ID من env)
│   └── inquiry/
│       ├── save.js
│       └── get.js
└── assets/
    ├── css/style.css
    ├── js/
    │   ├── script.js       # الوظائف الرئيسية
    │   ├── cms.js          # إدارة المحتوى
    │   ├── customer-service.js
    │   ├── analytics.js    # Google Analytics
    │   └── pwa.js          # تسجيل Service Worker
    └── images/
        ├── logo.jpeg
        ├── building.jpeg
        ├── team-main.jpg
        ├── founder-mohamed.jpg
        ├── agent-adam.jpg
        ├── gallery-*.jpeg          # صور المعرض
        ├── laptop1-3.png           # صور المطابقة
        ├── vr1-3.jpeg              # جولة 360°
        └── maintenance_team/       # صور الفريق (أسماء إنجليزية)
```

---

## التشغيل محلياً

```bash
# تثبيت الاعتماديات (للـ API functions)
npm install

# تشغيل بيئة Vercel المحلية (موصى به)
npx vercel dev

# أو خادم HTTP بسيط
npx serve .
```

---

## النشر على Vercel وربط GitHub

### 1) ربط المستودع بـ Vercel (مرة واحدة)

1. ادخل [vercel.com](https://vercel.com) وسجّل دخولك
2. **Add New → Project**
3. اختر **Import Git Repository** → `mohamedtharwat556/YAS-CITY`
4. Framework Preset: **Other** (موقع static)
5. Root Directory: `./`
6. Build Command: اتركه فارغاً
7. Output Directory: `.`
8. اضغط **Deploy**

بعد الربط: **كل push على `main` ينشر تلقائياً** على Vercel.

### 2) متغيرات البيئة في Vercel

من **Project Settings → Environment Variables**:

| المتغير | الوصف |
|---------|--------|
| `SUPABASE_URL` | رابط مشروع Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | مفتاح Service Role (للـ API فقط) |
| `GA_MEASUREMENT_ID` | معرف Google Analytics (مثل `G-XXXXXXXXXX`) |
| `TELEGRAM_BOT_TOKEN` | توكن بوت Telegram للإشعارات الفورية |
| `TELEGRAM_CHAT_ID` | معرف المحادثة/القناة في Telegram |
| `SITE_URL` | (اختياري) رابط الموقع — الافتراضي `https://yas-city.vercel.app` |

> **مهم:** لا تضع Service Role Key في `config.js` — فقط في Vercel.

### 3) التحقق من الربط

بعد الربط، من **Project → Git** في Vercel يجب أن ترى:
- Repository: `mohamedtharwat556/YAS-CITY`
- Production Branch: `main`
- **Auto Deploy** مفعّل

كل `git push origin main` ينشر تلقائياً خلال ~1 دقيقة.

### 4) ربط الدومين (اختياري)

**Project Settings → Domains** → أضف دومينك المخصص.

---

## Google Analytics

1. أنشئ Property في [Google Analytics](https://analytics.google.com)
2. انسخ Measurement ID (يبدأ بـ `G-`)
3. **الطريقة الموصى بها:** ضعه في Vercel كـ `GA_MEASUREMENT_ID` — يُحمّل عبر `/api/public-config` بدون كشفه في الكود
4. **بديل:** ضعه في `config.js`:

```js
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
```

5. سجّل الموقع في [Google Search Console](https://search.google.com/search-console) وأضف `sitemap.xml`

---

## SEO

- `sitemap.xml` — الصفحات العامة الأربع
- `robots.txt` — يسمح بفهرسة الصفحات العامة ويمنع `/dashboard` و `/login` و `/api/`
- كل صفحة عامة: `meta description` + Open Graph + canonical
- `index.html`: Schema.org (LocalBusiness)
- `dashboard.html` و `login.html`: `noindex, nofollow`
- PWA: `manifest.json` + Service Worker

---

## تنظيف الصور

تم تنظيم مجلد `assets/images/`:

| قبل | بعد |
|-----|-----|
| أسماء WhatsApp/Facebook طويلة | `team-main.jpg`, `gallery-*.jpeg`, `founder-mohamed.jpg` |
| صور مكررة في الجذر و `maintenance_team/` | حذف المكررات — الصور في `maintenance_team/` فقط |
| ~20 صورة غير مستخدمة | حذف (`vr4`, `yas_ai_hologram`, `ragaa.PNG`, …) |
| أسماء عربية بمسافات للفريق | `khaled.jpeg`, `amr.jpeg`, `waleed.jpeg`, … |

**نصيحة:** اضغط الصور الكبيرة عبر [TinyPNG](https://tinypng.com) قبل الرفع.

---

## Service Worker (`sw.js`)

- مسارات صحيحة: `assets/css/style.css`, `assets/js/script.js`, …
- Cache-first للملفات الثابتة، network-first لـ `/api/`
- لا يخزّن Supabase/CDN/Google Analytics
- يُسجّل عبر `assets/js/pwa.js` في الصفحات العامة

---

## التقنيات

- HTML5 / CSS3 / JavaScript (ES6+)
- Supabase (Auth + Database)
- Vercel Serverless Functions
- Chart.js, AOS, Pannellum (360°)
- Google Fonts (Tajawal)

---

## الأمان

- لا ترفع ملفات تحتوي كلمات مرور
- فعّل Row Level Security (RLS) في Supabase
- غيّر كلمات المرور إذا تسرّبت سابقاً في Git history

---

## الترخيص

© YAS CITY — جميع الحقوق محفوظة.
