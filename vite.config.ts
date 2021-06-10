import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        assetsDir: 'static'
    },
    resolve: {
        alias: [
            { find: '@', replacement: resolve('src') },
            {
                find: 'components',
                replacement: resolve('src/components'),
            },
            {
                find: 'style',
                replacement: resolve('src/style'),
            },
        ],
    },
})
