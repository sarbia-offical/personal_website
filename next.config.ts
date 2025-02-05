import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/, // 匹配 .svg 文件
            use: ['@svgr/webpack'], // 使用 @svgr/webpack 处理
        });
        return config; // 返回更新后的配置
    },
    images: {
        domains: ['localhost'], // 允许加载 localhost 的图片
    },
};

export default nextConfig;
