// YAS CITY — Trade-in (استبدال) service
(function () {
    'use strict';

    const TRADE_BASE = {
        laptop: 12000,
        macbook: 22000,
        desktop: 8000,
        tablet: 4000
    };

    const CONDITION_MULT = {
        excellent: 0.72,
        good: 0.58,
        fair: 0.42,
        poor: 0.28
    };

    window.openTradeIn = function () {
        const modal = document.getElementById('trade-in-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeTradeIn = function () {
        const modal = document.getElementById('trade-in-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        hideTradeInResult();
    };

    window.previewTradeInEstimate = function () {
        const type = document.getElementById('trade-device-type')?.value || 'laptop';
        const condition = document.getElementById('trade-condition')?.value || 'good';
        const brand = document.getElementById('trade-brand')?.value.trim() || '';
        const age = parseInt(document.getElementById('trade-age')?.value || '3', 10);

        const base = TRADE_BASE[type] || 10000;
        const mult = CONDITION_MULT[condition] || 0.5;
        const ageDeduction = Math.min(age * 0.08, 0.4);
        let estimate = Math.round(base * mult * (1 - ageDeduction));

        if (brand.toLowerCase().includes('apple') || brand.toLowerCase().includes('mac')) {
            estimate = Math.round(estimate * 1.15);
        }

        const min = Math.round(estimate * 0.85);
        const max = Math.round(estimate * 1.15);

        const resultBox = document.getElementById('trade-estimate-result');
        const amountEl = document.getElementById('trade-estimate-amount');
        if (resultBox && amountEl) {
            amountEl.textContent = `${min.toLocaleString('ar-EG')} – ${max.toLocaleString('ar-EG')} جنيه`;
            resultBox.style.display = 'block';
        }

        return { min, max, estimate };
    };

    window.submitTradeIn = async function (event) {
        event.preventDefault();

        const name = document.getElementById('trade-name')?.value.trim();
        const phone = document.getElementById('trade-phone')?.value.trim();
        const type = document.getElementById('trade-device-type')?.value;
        const brand = document.getElementById('trade-brand')?.value.trim();
        const condition = document.getElementById('trade-condition')?.value;
        const age = document.getElementById('trade-age')?.value;
        const notes = document.getElementById('trade-notes')?.value.trim();
        const photoInput = document.getElementById('trade-photo');

        if (!name || !phone || !brand) {
            alert('يرجى إدخال الاسم والهاتف ونوع الجهاز');
            return;
        }

        const { min, max } = previewTradeInEstimate();
        const conditionLabels = { excellent: 'ممتاز', good: 'جيد', fair: 'مقبول', poor: 'يحتاج إصلاح' };
        const typeLabels = { laptop: 'لابتوب', macbook: 'ماك بوك', desktop: 'كمبيوتر', tablet: 'تابلت' };

        let photoNote = '';
        if (photoInput?.files?.[0]) {
            photoNote = ` | صورة: ${photoInput.files[0].name} (${Math.round(photoInput.files[0].size / 1024)}KB)`;
        }

        const inquiryData = {
            type: 'trade_in',
            name,
            phone,
            device_type: `${typeLabels[type] || type} — ${brand}`,
            fault: `حالة: ${conditionLabels[condition]} | عمر: ${age} سنوات${photoNote}`,
            message: notes || `تقدير استبدال: ${min}-${max} جنيه`,
            estimate: `${min}-${max} EGP`,
            status: 'new'
        };

        if (window.saveInquiry) {
            await window.saveInquiry(inquiryData);
        }

        const waMsg = [
            'مرحباً YAS CITY،',
            'أود استبدال جهازي (Trade-in):',
            `• الجهاز: ${typeLabels[type]} — ${brand}`,
            `• الحالة: ${conditionLabels[condition]}`,
            `• العمر: ${age} سنوات`,
            `• التقدير المعروض: ${min.toLocaleString()} – ${max.toLocaleString()} جنيه`,
            notes ? `• ملاحظات: ${notes}` : '',
            '',
            `الاسم: ${name}`,
            `الهاتف: ${phone}`
        ].filter(Boolean).join('\n');

        if (window.openWhatsApp) {
            window.openWhatsApp('201158986999', waMsg);
        }

        alert('تم إرسال طلب الاستبدال! سيتواصل معك فريق المبيعات لتأكيد السعر النهائي.');
        document.getElementById('trade-in-form')?.reset();
        hideTradeInResult();
        closeTradeIn();
    };

    function hideTradeInResult() {
        const box = document.getElementById('trade-estimate-result');
        if (box) box.style.display = 'none';
    }

    document.addEventListener('DOMContentLoaded', function () {
        ['trade-device-type', 'trade-condition', 'trade-age', 'trade-brand'].forEach(function (id) {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', previewTradeInEstimate);
            if (el && el.tagName === 'INPUT') el.addEventListener('input', previewTradeInEstimate);
        });

        document.getElementById('trade-in-modal')?.addEventListener('click', function (e) {
            if (e.target === this) closeTradeIn();
        });
    });
})();
