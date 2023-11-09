/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');

const nextConfig = nextTranslate({
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
});

module.exports = nextConfig;
