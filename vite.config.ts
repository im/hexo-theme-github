import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: (name) => {
                        return `element-plus/lib/theme-chalk/${name}.css`
                    },
                    resolveComponent: (name) => {
                        return `element-plus/lib/${name}`
                    },
                },
            ],
        }),
    ],
    build: {
        assetsDir: 'static',
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
