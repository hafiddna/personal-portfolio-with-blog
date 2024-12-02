import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 'api.osingbahari.com',
    //         },
    //         {
    //             protocol: 'http',
    //             hostname: 'localhost',
    //             port: '3010',
    //             pathname: '/api/**',
    //         }
    //     ],
    // }
};

export default nextConfig;
