/**
 * Capa de datos WordPress headless con fallback a datos fijos.
 *
 * Fuente WP esperada (a configurar cuando haya acceso a reserman.cl/admin):
 *   - Servicios:   CPT `servicio` con ACF (resumen, icono, pregunta, claim, items, orden)
 *                  GET {WP_URL}/wp-json/wp/v2/servicio?per_page=50&_fields=slug,title,content,acf,menu_order
 *   - Contacto:    ACF Options Page expuesta en
 *                  GET {WP_URL}/wp-json/acf/v3/options/options   (plugin ACF to REST API)
 *                  o endpoint propio GET {WP_URL}/wp-json/reserman/v1/contacto
 *   - Somos:       página slug `somos` + ACF (mision, vision, valores)
 *
 * Si WP no responde, devuelve los datos de src/data/site.ts.
 * Todo se resuelve en build (output: static).
 */
import {
  contacto as contactoFijo,
  servicios as serviciosFijos,
  somos as somosFijo,
  type Contacto,
  type Servicio,
  type Somos,
} from '../data/site';

const WP_URL = (import.meta.env.WP_URL ?? '').replace(/\/$/, '');
const USE_WP = import.meta.env.USE_WP !== 'false' && WP_URL !== '';
const TIMEOUT_MS = 8000;

async function wpGet<T>(path: string): Promise<T | null> {
  if (!USE_WP) return null;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    const res = await fetch(`${WP_URL}/wp-json${path}`, { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// ---------- Contacto ----------
interface WpContactoOptions {
  acf?: Record<string, any>;
  [k: string]: any;
}

export async function getContacto(): Promise<Contacto> {
  const data =
    (await wpGet<WpContactoOptions>('/reserman/v1/contacto')) ??
    (await wpGet<WpContactoOptions>('/acf/v3/options/options'));
  const o = data?.acf ?? data;
  if (!o || typeof o !== 'object' || !o.email) return contactoFijo;

  const whatsapp = String(o.whatsapp ?? o.telefono ?? contactoFijo.whatsapp).replace(/\D/g, '');
  return {
    ...contactoFijo,
    empresa: o.empresa ?? contactoFijo.empresa,
    tagline: o.tagline ?? contactoFijo.tagline,
    lema: o.lema ?? contactoFijo.lema,
    telefono: o.telefono ?? contactoFijo.telefono,
    telefonoRaw: '+' + String(o.telefono ?? contactoFijo.telefonoRaw).replace(/\D/g, ''),
    whatsapp,
    email: o.email,
    direccion: o.direccion ?? contactoFijo.direccion,
    comuna: o.comuna ?? contactoFijo.comuna,
    ciudad: o.ciudad ?? contactoFijo.ciudad,
    horario: o.horario ?? contactoFijo.horario,
    redes: {
      linkedin: o.linkedin ?? contactoFijo.redes.linkedin,
      instagram: o.instagram ?? contactoFijo.redes.instagram,
      facebook: o.facebook ?? contactoFijo.redes.facebook,
    },
  };
}

// ---------- Servicios ----------
interface WpServicio {
  slug: string;
  menu_order?: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  _embedded?: { 'wp:featuredmedia'?: { source_url?: string }[] };
  acf?: {
    imagen?: string | { url?: string };
    resumen?: string;
    titulo_corto?: string;
    icono?: Servicio['icono'];
    pregunta?: string;
    claim?: string;
    items?: { item: string }[] | string[];
    destacado?: boolean;
    orden?: number;
  };
}

export async function getServicios(): Promise<Servicio[]> {
  const data = await wpGet<WpServicio[]>(
    '/wp/v2/servicio?per_page=50&orderby=menu_order&order=asc&_fields=slug,title,content,excerpt,acf,menu_order,_links,_embedded&_embed=wp:featuredmedia'
  );
  if (!Array.isArray(data) || data.length === 0) return serviciosFijos;

  return data
    .map((p, i): Servicio => {
      const a = p.acf ?? {};
      const items = Array.isArray(a.items)
        ? a.items.map((it: any) => (typeof it === 'string' ? it : it.item)).filter(Boolean)
        : undefined;
      const imagenAcf = typeof a.imagen === 'string' ? a.imagen : a.imagen?.url;
      const imagen = imagenAcf ?? p._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      return {
        slug: p.slug,
        imagen,
        titulo: stripHtml(p.title.rendered),
        tituloCorto: a.titulo_corto ?? stripHtml(p.title.rendered),
        resumen: a.resumen ?? stripHtml(p.excerpt?.rendered ?? '').slice(0, 220),
        icono: a.icono ?? 'gestion',
        pregunta: a.pregunta,
        claim: a.claim,
        items,
        destacado: a.destacado ?? false,
        contenido: p.content.rendered,
        orden: a.orden ?? p.menu_order ?? i + 1,
      };
    })
    .sort((a, b) => a.orden - b.orden);
}

export async function getServicio(slug: string): Promise<Servicio | undefined> {
  const all = await getServicios();
  return all.find((s) => s.slug === slug);
}

// ---------- Somos ----------
interface WpPage {
  title: { rendered: string };
  content: { rendered: string };
  acf?: { intro?: string; mision?: string; vision?: string; valores?: { valor: string }[] | string[] };
}

export async function getSomos(): Promise<Somos> {
  const data = await wpGet<WpPage[]>('/wp/v2/pages?slug=somos&_fields=title,content,acf');
  const p = Array.isArray(data) ? data[0] : undefined;
  if (!p?.acf?.mision) return somosFijo;
  const a = p.acf;
  const valores = Array.isArray(a.valores)
    ? a.valores.map((v: any) => (typeof v === 'string' ? v : v.valor)).filter(Boolean)
    : somosFijo.valores;
  return {
    titulo: stripHtml(p.title.rendered),
    intro: a.intro ?? stripHtml(p.content.rendered),
    mision: a.mision ?? somosFijo.mision,
    vision: a.vision ?? somosFijo.vision,
    valores,
  };
}

export const dataSource = USE_WP ? `WordPress (${WP_URL}) con fallback` : 'datos fijos';
