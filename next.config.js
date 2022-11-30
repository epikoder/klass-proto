/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MYSQL_DATABASE: process.env.MYSQL_DATABASE ?? "klass",
    MYSQL_USER: process.env.MYSQL_USER ?? "root",
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ?? "",

    QUESTION_COUNT: 60
  }
}

module.exports = nextConfig
