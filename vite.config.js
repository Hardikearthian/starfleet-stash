import {
  defineConfig,
  transformWithOxc,
} from 'vite';
import react from '@vitejs/plugin-react';

const transformJsxInJs = () => ({
  name: 'transform-jsx-in-js',
  enforce: 'pre',

  async transform(code, id) {
    const isSourceJavaScriptFile =
      /[\\/]src[\\/].*\.js$/.test(id);

    if (!isSourceJavaScriptFile) {
      return null;
    }

    return transformWithOxc(code, id, {
      lang: 'jsx',
    });
  },
});

export default defineConfig({
  plugins: [
    transformJsxInJs(),
    react(),
  ],

  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});