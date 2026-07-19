// YAS CITY — Central inquiry save + team notifications
(function () {
    'use strict';

    window.saveInquiry = async function (inquiryData) {
        const payload = {
            id: inquiryData.id || Date.now(),
            status: inquiryData.status || 'new',
            created_at: inquiryData.created_at || new Date().toISOString(),
            ...inquiryData
        };

        try {
            const existing = JSON.parse(localStorage.getItem('yas_inquiries') || '[]');
            existing.unshift(payload);
            localStorage.setItem('yas_inquiries', JSON.stringify(existing));
        } catch (e) {
            console.error('LocalStorage save error:', e);
        }

        if (window.sendTelegramAlert) {
            window.sendTelegramAlert(payload);
        }

        let savedRemote = false;
        try {
            const res = await fetch('/api/inquiry/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) savedRemote = true;
        } catch (e) {
            console.warn('API save unavailable:', e);
        }

        if (!savedRemote && window.yasDb) {
            try {
                await window.yasDb.from('inquiries').insert([payload]);
            } catch (e) {
                console.warn('Supabase save error:', e);
            }
        }

        if (!savedRemote) {
            notifyTeamServer(payload);
        }

        return payload;
    };

    async function notifyTeamServer(data) {
        try {
            await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (e) {
            console.warn('Server notify unavailable:', e);
        }
    }

    window.openWhatsApp = function (phone, message) {
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    };
})();
