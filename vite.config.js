import { fileURLToPath, URL } from 'node:url';
import { createRequire } from 'node:module';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import vue from '@vitejs/plugin-vue';
const require = createRequire(import.meta.url);

export default defineConfig(({ mode }) => {
  
  const { VITE_TITLE, VITE_PORTAL_API, VITE_API_URL } = loadEnv(mode, process.cwd(), '');

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
      }),
      createHtmlPlugin({
        minify: true,
        entry: 'src/main.js',
        template: '/index.html',
        inject: {data: {title: VITE_TITLE}}
      })

    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData:
          //     '@import "./src/styles/variables";@import "./src/styles/_mixin";'
        }
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

