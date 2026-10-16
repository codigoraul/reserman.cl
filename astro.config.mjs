// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import relativeLinks from 'astro-relative-links';

export default defineConfig({
  site: 'https://reserman.cl',
  output: 'static',
  integrations: [sitemap(), relativeLinks()],
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    // CSS embebido en cada HTML: evita el parpadeo sin estilos (FOUC) al navegar
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
