const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf8');

// 1. Add global functions
const globalFns = `
// ------------------------------------
// Global Helper Functions (Refactored)
// ------------------------------------
window.saveInquiry = async function (inquiryData) {
    // 1. Save to localStorage
    try {
        const existing = JSON.parse(localStorage.getItem('yas_inquiries') || '[]');
        existing.unshift(inquiryData);
        localStorage.setItem('yas_inquiries', JSON.stringify(existing));
        if (window.sendTelegramAlert) window.sendTelegramAlert(inquiryData);
    } catch(e) {
        console.error('LocalStorage Save Error:', e);
    }

    // 2. Try to save to Supabase
    if (window.yasDb) {
        try {
            await window.yasDb.from('inquiries').insert([inquiryData]);
        } catch (err) {
            console.error('Supabase Save Error:', err);
        }
    } else if (window.supabase) {
        try {
            await window.supabase.from('inquiries').insert([inquiryData]);
        } catch (err) {
            console.error('Supabase Save Error:', err);
        }
    }
};

window.openWhatsApp = function (phone, message) {
    const encodedMsg = encodeURIComponent(message);
    window.open(\`https://wa.me/\${phone}?text=\${encodedMsg}\`, '_blank');
};

`;

content = content.replace('// Supabase Handlers (Browser Side)', globalFns + '// Supabase Handlers (Browser Side)');

// 2. Refactor bookRepair
const bookRepairOld = `    // 1. Save to localStorage
    try {
        const existing = JSON.parse(localStorage.getItem('yas_inquiries') || '[]');
        existing.unshift(inquiryData);
        localStorage.setItem('yas_inquiries', JSON.stringify(existing));
        if(window.sendTelegramAlert) window.sendTelegramAlert(inquiryData);
    } catch(e) {}

    // 2. Try to save to Supabase
    if (window.yasDb) {
        try {
            await window.yasDb.from('inquiries').insert([inquiryData]);
        } catch (err) {}
    }

    // 3. Open WhatsApp
    const msg = encodeURIComponent(\`السلام عليكم YAS CITY، أود طلب صيانة (\${selectedStorage.brand}). العطل: (\${selectedStorage.fault}). الجودة: \${q}. التكلفة التقديرية: \${price}\`);
    window.open(\`https://wa.me/201147800144?text=\${msg}\`, '_blank');`;

const bookRepairNew = `    window.saveInquiry(inquiryData);
    
    // 3. Open WhatsApp
    const msg = \`السلام عليكم YAS CITY، أود طلب صيانة (\${selectedStorage.brand}). العطل: (\${selectedStorage.fault}). الجودة: \${q}. التكلفة التقديرية: \${price}\`;
    window.openWhatsApp('201147800144', msg);`;

content = content.replace(bookRepairOld, bookRepairNew);

// 3. Refactor buyProduct
const buyProductOld = `    try {
        const existing = JSON.parse(localStorage.getItem('yas_inquiries') || '[]');
        existing.unshift(inquiryData);
        localStorage.setItem('yas_inquiries', JSON.stringify(existing));
        if(window.sendTelegramAlert) window.sendTelegramAlert(inquiryData);
    } catch(e) {}

    if (window.yasDb) {
        window.yasDb.from('inquiries').insert([inquiryData]);
    }

    const waMsg = encodeURIComponent(\`السلام عليكم، أود الاستفسار عن \${productName}\`);
    window.open(\`https://wa.me/201158986999?text=\${waMsg}\`, '_blank');`;

const buyProductNew = `    window.saveInquiry(inquiryData);

    const waMsg = \`السلام عليكم، أود الاستفسار عن \${productName}\`;
    window.openWhatsApp('201158986999', waMsg);`;

content = content.replace(buyProductOld, buyProductNew);

// 4. Refactor contactMatch
const contactMatchOld = `    // Save to localStorage
    try {
        const existing = JSON.parse(localStorage.getItem('yas_inquiries') || '[]');
        existing.unshift(inquiryData);
        localStorage.setItem('yas_inquiries', JSON.stringify(existing));
        if(window.sendTelegramAlert) window.sendTelegramAlert(inquiryData);
    } catch(e) {}

    // Save Final Interest to Database (Safe Call)
    if (window.yasDb) {
        window.yasDb.from('inquiries').insert([inquiryData])
            .then(() => console.log("Match Contact Logged"))
            .catch(err => console.error('Save Error:', err));
    }

    const msg = encodeURIComponent(\`مرحباً YAS CITY، رشح لي الموقع هذا الجهاز: (\${matchName}). هل هو متوفر وما السعر؟\`);
    window.open(\`https://wa.me/201158986999?text=\${msg}\`, '_blank');`;

const contactMatchNew = `    window.saveInquiry(inquiryData);

    const msg = \`مرحباً YAS CITY، رشح لي الموقع هذا الجهاز: (\${matchName}). هل هو متوفر وما السعر؟\`;
    window.openWhatsApp('201158986999', msg);`;

content = content.replace(contactMatchOld, contactMatchNew);


fs.writeFileSync('script.js', content);
console.log('Refactoring complete.');
