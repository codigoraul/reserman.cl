# reserman-astro

Sitio de **Reserman SpA** (reserman.cl) en Astro 5 + Tailwind CSS 4, preparado para WordPress headless.

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/ (estático, listo para cPanel)
npm run preview
```

## Datos: WordPress headless con fallback

Toda la data pasa por `src/lib/wp.ts`:

| Función          | Fuente WP (cuando exista)                                   | Fallback               |
| ---------------- | ----------------------------------------------------------- | ---------------------- |
| `getContacto()`  | `/wp-json/reserman/v1/contacto` o ACF Options (`/acf/v3/options/options`) | `src/data/site.ts` → `contacto` |
| `getServicios()` | CPT `servicio` + ACF (`resumen`, `titulo_corto`, `icono`, `pregunta`, `claim`, `items`, `destacado`, `orden`) | `src/data/site.ts` → `servicios` |
| `getSomos()`     | página `somos` + ACF (`intro`, `mision`, `vision`, `valores`) | `src/data/site.ts` → `somos` |

- Sin `.env` (o `USE_WP=false`) el sitio se construye 100 % con los datos fijos.
- Con `WP_URL=https://reserman.cl` intenta WP; si el endpoint no existe o falla, cae al fallback sin romper el build.
- Los slides del home viven en `src/data/site.ts` → `slides` (3 slides). Para usar fotos: copia `slide-1.webp`, `slide-2.webp`, `slide-3.webp` a `public/slides/` y descomenta `imagen` en cada slide.

## Estructura

```
src/
  data/site.ts              datos fijos (contacto, servicios, somos, slides)
  lib/wp.ts                 capa WP headless + fallback
  layouts/Layout.astro      head SEO, TopBar, Header, Footer, WhatsApp
  components/
    TopBar.astro            barra superior: teléfono, email, dirección, horario, redes
    Header.astro            logo + nav con dropdown Soluciones + menú móvil
    HeroSlider.astro        slider 3 slides (autoplay, flechas, dots, swipe)
    ServicioCard.astro
    ContactoSection.astro   datos + formulario
    ContactForm.astro       envía por WhatsApp (sin backend)
    CtaBanner.astro
    PageHeader.astro
    Footer.astro            3 columnas: marca / soluciones / contacto
    WhatsAppButton.astro
    Icon.astro              iconos SVG inline
  pages/
    index.astro, somos.astro, contacto.astro, 404.astro
    soluciones/index.astro, soluciones/[slug].astro
public/
  logo-reserman.svg, logo-reserman.png, favicon.svg, robots.txt
```

## Pendientes

- Acceso a reserman.cl/admin: crear CPT `servicio` + ACF Options de contacto (ver `src/lib/wp.ts`).
- Fotos para los 3 slides (`public/slides/`).
- Formulario: hoy abre WhatsApp; cambiar a PHP en cPanel o Web3Forms si se quiere por email.
