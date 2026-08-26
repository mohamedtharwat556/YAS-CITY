(function () {
    function initGA(gaId) {
        if (!gaId) return;

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', gaId, { anonymize_ip: true });
    }

    const fromConfig =
        (typeof GA_MEASUREMENT_ID !== 'undefined' && GA_MEASUREMENT_ID) ||
        (typeof window !== 'undefined' && window.GA_MEASUREMENT_ID);

    if (fromConfig) {
        initGA(fromConfig);
        return;
    }

    fetch('/api/public-config')
        .then((response) => (response.ok ? response.json() : null))
        .then((config) => {
            if (config && config.gaMeasurementId) {
                initGA(config.gaMeasurementId);
            }
        })
        .catch(() => {});
})();
