import {defineConfig} from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'src/static/svg'),
          dest: 'static',
        },
      ],
    }),
  ],
});
