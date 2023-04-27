/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
        prependData: `
         @import "@/styles/_variables.scss";
         @import "@/styles/_functions.scss";
         `,
    },
}

module.exports = nextConfig
