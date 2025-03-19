import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    // base: "/app/",
    plugins: [react()],
    // server: {
    //     port: 5173,
    //     strictPort: true,
    //     // allowedHosts: ['.goldgod.xyz'],
    //     // ! 注意：如果浏览器使用了代理，需要页面域名加入直连名单，否则可能导致hmr的websocket连接失败
    //     // ! 可能代理没有配置好
    //     hmr: {
    //         // 与`compose.yml`中的`traefik.http.services.svc_view_hmr.loadbalancer.server.port`保持一致
    //         port: 5175, // 在容器中本应用监听的端口
    //         // 取决于客户端用的是http还是https??? 否则为什么不生效
    //         // protocal: "wss",
    //         // path: "/__bundler_hmr", // 不能以`.`开头，否则可能基于当前页面路径
    //         // 省略的话，会请求`ws://py.goldgod.xyz/`
    //         clientPort: 65443,
    //     },
    //     // warmup: {
    //     //     clientFiles: ['./src/components/*.vue', './src/utils/big-utils.js'],
    //     //     ssrFiles: ['./src/server/modules/*.js'],
    //     // },
    //     watch: {
    //         usePolling: true
    //     }
    // },
});
