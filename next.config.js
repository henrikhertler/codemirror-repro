/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');

const nextConfig = nextTranslate({
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    transpilePackages: [
        'codemirror-json-schema',
        'json-schema-library',
    ],
});

module.exports = nextConfig;
