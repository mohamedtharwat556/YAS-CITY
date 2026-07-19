module.exports = async (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json({
        siteUrl: process.env.SITE_URL || 'https://yas-city.vercel.app',
        gaMeasurementId: process.env.GA_MEASUREMENT_ID || ''
    });
};
