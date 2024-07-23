import { fileURLToPath, URL } from 'node:url';
import { createRequire } from 'node:module';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
const require = createRequire(import.meta.url);

export default defineConfig(({ mode }) => {
    const _buildOptions = (mode === 'prod') ? {
        sourcemap: true,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    } : {};

    return {
        plugins: [
            vue({
                template: {
                    compilerOptions: {
                        compatConfig: {
                            MODE: 3
                        }
                    },
                    script: {
                        defineModel: true
                    }
                }
            })

        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            // proxy: {
            //     '/api': {
            //         target: 'https://dev-api-adm.kb-ocare.co.kr',
            //         changeOrigin: true,
            //         secure: false,
            //         rewrite: path => path.replace(/^\/api/, '')
            //     }
            // }
        },
        build: _buildOptions
    };
});

