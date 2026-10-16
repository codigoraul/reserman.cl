/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly WP_URL?: string;
  readonly USE_WP?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
