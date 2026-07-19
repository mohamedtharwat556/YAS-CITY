// YAS CITY — Laptop specs database for AI matching & comparison
window.YAS_DEVICES_DB = {
    'hp probook 450 g8': {
        name: 'HP ProBook 450 G8',
        cpu: 'Intel Core i5-1135G7',
        ram: '8GB DDR4',
        storage: '512GB SSD',
        gpu: 'Intel Iris Xe',
        battery: '3-cell 45Wh',
        weight: '1.74 kg',
        price: 15000,
        score: 78,
        category: 'business'
    },
    'dell latitude 5420': {
        name: 'Dell Latitude 5420',
        cpu: 'Intel Core i5-1145G7',
        ram: '16GB DDR4',
        storage: '512GB SSD',
        gpu: 'Intel Iris Xe',
        battery: '3-cell 58Wh',
        weight: '1.48 kg',
        price: 18000,
        score: 85,
        category: 'business'
    },
    'dell latitude 7480': {
        name: 'Dell Latitude 7480',
        cpu: 'Intel Core i5-7300U',
        ram: '8GB DDR4',
        storage: '256GB SSD',
        gpu: 'Intel HD 620',
        battery: '4-cell 60Wh',
        weight: '1.63 kg',
        price: 8500,
        score: 65,
        category: 'student'
    },
    'lenovo thinkpad e15': {
        name: 'Lenovo ThinkPad E15',
        cpu: 'Intel Core i5-1135G7',
        ram: '8GB DDR4',
        storage: '512GB SSD',
        gpu: 'Intel Iris Xe',
        battery: '3-cell 45Wh',
        weight: '1.7 kg',
        price: 14000,
        score: 76,
        category: 'business'
    },
    'hp victus 15': {
        name: 'HP Victus 15',
        cpu: 'Intel Core i7-12700H',
        ram: '16GB DDR5',
        storage: '512GB SSD',
        gpu: 'NVIDIA RTX 3050',
        battery: '4-cell 70Wh',
        weight: '2.29 kg',
        price: 32000,
        score: 88,
        category: 'gaming'
    },
    'asus rog strix g15': {
        name: 'ASUS ROG Strix G15',
        cpu: 'AMD Ryzen 7 5800H',
        ram: '16GB DDR4',
        storage: '1TB SSD',
        gpu: 'NVIDIA RTX 3060',
        battery: '4-cell 90Wh',
        weight: '2.3 kg',
        price: 42000,
        score: 92,
        category: 'gaming'
    },
    'macbook pro 14': {
        name: 'MacBook Pro 14"',
        cpu: 'Apple M2 Pro',
        ram: '16GB Unified',
        storage: '512GB SSD',
        gpu: '19-core GPU',
        battery: '70Wh',
        weight: '1.6 kg',
        price: 65000,
        score: 95,
        category: 'design'
    },
    'macbook air m2': {
        name: 'MacBook Air M2',
        cpu: 'Apple M2',
        ram: '16GB Unified',
        storage: '512GB SSD',
        gpu: '10-core GPU',
        battery: '52.6Wh',
        weight: '1.24 kg',
        price: 45000,
        score: 90,
        category: 'portable'
    },
    'thinkpad x1 carbon': {
        name: 'ThinkPad X1 Carbon',
        cpu: 'Intel Core i7-1260P',
        ram: '16GB LPDDR5',
        storage: '1TB SSD',
        gpu: 'Intel Iris Xe',
        battery: '4-cell 57Wh',
        weight: '1.12 kg',
        price: 38000,
        score: 91,
        category: 'business'
    },
    'hp elitebook 840 g6': {
        name: 'HP EliteBook 840 G6',
        cpu: 'Intel Core i5-8365U',
        ram: '16GB DDR4',
        storage: '512GB SSD',
        gpu: 'Intel UHD 620',
        battery: '3-cell 50Wh',
        weight: '1.48 kg',
        price: 11000,
        score: 72,
        category: 'business'
    }
};

window.findDevice = function (query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return null;

    if (window.YAS_DEVICES_DB[q]) {
        return window.YAS_DEVICES_DB[q];
    }

    let best = null;
    let bestScore = 0;

    Object.entries(window.YAS_DEVICES_DB).forEach(([key, device]) => {
        const nameLower = device.name.toLowerCase();
        if (nameLower.includes(q) || q.includes(key)) {
            const score = key.length + (nameLower.startsWith(q) ? 10 : 0);
            if (score > bestScore) {
                bestScore = score;
                best = device;
            }
        } else {
            const words = q.split(/\s+/);
            const matches = words.filter(w => w.length > 2 && (key.includes(w) || nameLower.includes(w))).length;
            if (matches >= 2 && matches > bestScore) {
                bestScore = matches;
                best = device;
            }
        }
    });

    return best;
};

window.searchDeviceSuggestions = function (query, limit) {
    const q = (query || '').toLowerCase().trim();
    if (q.length < 2) return [];

    return Object.values(window.YAS_DEVICES_DB)
        .filter(d => d.name.toLowerCase().includes(q))
        .slice(0, limit || 5);
};

window.compareDevices = function (name1, name2) {
    const d1 = findDevice(name1) || generateEstimatedDevice(name1);
    const d2 = findDevice(name2) || generateEstimatedDevice(name2);
    const winner = d1.score >= d2.score ? d1 : d2;
    const verdict = buildComparisonVerdict(d1, d2, winner);
    return { device1: d1, device2: d2, winner, verdict };
};

function generateEstimatedDevice(name) {
    const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const score = 55 + (hash % 35);
    return {
        name: name,
        cpu: 'غير محدد — يحتاج فحص',
        ram: '8GB (تقديري)',
        storage: '256GB SSD (تقديري)',
        gpu: 'مدمج',
        battery: 'متوسط',
        weight: '1.6 kg (تقديري)',
        price: 8000 + (hash % 15000),
        score: score,
        category: 'unknown',
        estimated: true
    };
}

function buildComparisonVerdict(d1, d2, winner) {
    if (d1.estimated || d2.estimated) {
        return `تم تحليل "${d1.name}" مقابل "${d2.name}". ${
            winner.estimated ? 'أحد الأجهزة غير موجود في قاعدة بياناتنا — تواصل معنا لتأكيد المواصفات والأسعار.' :
            `الجهاز "${winner.name}" يبدو الخيار الأفضل بناءً على البيانات المتاحة (تقييم ${winner.score}/100).`
        }`;
    }
    const reasons = [];
    if (winner === d2 && d2.weight && parseFloat(d2.weight) < parseFloat(d1.weight)) reasons.push('وزن أخف للتنقل');
    if (winner.ram && parseInt(winner.ram) > parseInt(d1.ram)) reasons.push('ذاكرة أكبر');
    if (winner.price < (d1.price + d2.price) / 2) reasons.push('سعر تنافسي');
    const reasonText = reasons.length ? reasons.join('، ') : 'توازن أفضل بين الأداء والسعر';
    return `بناءً على التحليل، "${winner.name}" (${winner.score}/100) يتفوق على "${winner === d1 ? d2.name : d1.name}" في ${reasonText}.`;
}
