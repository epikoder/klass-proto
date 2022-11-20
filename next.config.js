/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MYSQL_DATABASE: "klass",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "beLL1923"
  }
}

module.exports = nextConfig
