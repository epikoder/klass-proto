/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MYSQL_DATABASE: "klass",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "password"
  }
}

module.exports = nextConfig
