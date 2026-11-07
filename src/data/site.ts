/**
 * DATOS FIJOS (fallback).
 * Se usan mientras no haya acceso al WordPress de reserman.cl/admin.
 * Cuando WP esté disponible, src/lib/wp.ts reemplaza estos datos
 * con lo que devuelva la REST API (misma forma de objetos).
 *
 * Contenido de servicios y "Somos" según el archivo "Servicios 2027 - RESERMAN.xlsx" del cliente.
 */

export interface Contacto {
  empresa: string;
  tagline: string;
  lema: string;
  telefono: string;        // formato mostrado
  telefonoRaw: string;     // para tel: y wa.me
  whatsapp: string;        // solo dígitos con código país
  email: string;
  direccion: string;
  comuna: string;
  ciudad: string;
  horario: string;
  redes: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}

export interface Servicio {
  slug: string;
  titulo: string;
  tituloCorto: string;
  resumen: string;
  icono: 'proyectos' | 'soldadura' | 'mantenimiento' | 'montaje' | 'electrica' | 'civiles';
  pregunta?: string;      // gancho opcional (cabecera de la página)
  claim?: string;         // título alternativo opcional
  contenido: string;      // HTML
  imagen?: string;        // fondo de la card / cabecera
  items?: string[];
  destacado?: boolean;
  orden: number;
}

export interface Somos {
  titulo: string;
  intro: string;
  parrafos: string[];
  mision: string;
  vision: string;
  clientesTexto: string;
}

export interface Cliente {
  nombre: string;
  logo: string;
}

export interface Slide {
  eyebrow: string;
  titulo: string;      // admite HTML (ej. <span class="text-amber-500">)
  texto: string;
  cta: { label: string; href: string };
  ctaSecundario?: { label: string; href: string };
  imagen?: string;     // ej. '/slides/slide-1.webp' (opcional; si no hay, usa gradiente)
  gradiente: string;   // clases Tailwind del overlay
}

const overlay =
  'bg-[linear-gradient(100deg,rgba(11,42,58,0.78)_0%,rgba(11,42,58,0.5)_45%,rgba(11,42,58,0.18)_100%)]';

/** Slider del home: 3 slides. Cuando exista WP, se puede alimentar desde un CPT `slide`. */
export const slides: Slide[] = [
  {
    eyebrow: 'Ingeniería y mantenimiento industrial',
    titulo: 'Un socio de confianza para <span class="text-amber-500">tu operación industrial</span>',
    texto:
      'Ingeniería de proyectos, soldadura y fabricación, mantenimiento, montaje mecánico, ingeniería eléctrica y obras civiles menores para los sectores minero, alimentario, cosmético y químico.',
    cta: { label: 'Solicitar cotización', href: '/contacto' },
    ctaSecundario: { label: 'Ver servicios', href: '/soluciones' },
    imagen: '/slides/slide-1.webp',
    gradiente: overlay,
  },
  {
    eyebrow: 'Montaje mecánico industrial',
    titulo: 'Izajes, retiro y montaje de equipos <span class="text-amber-500">integrados a tu planta</span>',
    texto:
      'Coordinamos los trabajos con los equipos de operaciones y mantenimiento para integrarlos a las ventanas de intervención de la planta, con foco en la seguridad de las maniobras.',
    cta: { label: 'Ver montaje mecánico', href: '/soluciones/montaje-mecanico-industrial' },
    ctaSecundario: { label: 'Cotizar', href: '/contacto' },
    imagen: '/slides/slide-2.webp',
    gradiente: overlay,
  },
  {
    eyebrow: 'Mantenimiento industrial',
    titulo: 'Cuidamos tus equipos para <span class="text-amber-500">mantener tu operación en movimiento</span>',
    texto:
      'Mantenimiento preventivo y correctivo para equipos industriales, en nuestro taller o directamente en tus instalaciones.',
    cta: { label: 'Ver mantenimiento', href: '/soluciones/mantenimiento-industrial' },
    ctaSecundario: { label: 'Cotizar', href: '/contacto' },
    imagen: '/slides/slide-3.webp',
    gradiente: overlay,
  },
];

export const contacto: Contacto = {
  empresa: 'Reserman SpA',
  tagline: 'Soluciones Industriales',
  lema: 'Compromiso – Excelencia – Confianza',
  telefono: '+56 9 9099 4623',
  telefonoRaw: '+56990994623',
  whatsapp: '56990994623',
  email: 'contacto@reserman.cl',
  direccion: 'Guardia Vieja 202, Oficina 902',
  comuna: 'Providencia',
  ciudad: 'Santiago, Chile',
  horario: 'Lunes a viernes, 08:30 – 18:00 hrs',
  redes: {
    linkedin: 'https://www.linkedin.com/company/reserman-spa',
    instagram: 'https://www.instagram.com/resermanspa/',
  },
};

export const somos: Somos = {
  titulo: 'Quiénes somos',
  intro:
    'En Reserman llevamos 10 años prestando servicios de ingeniería y mantenimiento industrial a empresas de los sectores minero, alimentario, cosmético y químico.',
  parrafos: [
    'Buscamos ser un socio de confianza para nuestros clientes y construir relaciones de largo plazo. Nos involucramos desde el inicio, escuchamos sus necesidades y coordinamos cada trabajo con sus equipos, manteniendo una comunicación cercana durante todo el proceso.',
    'La seguridad es una prioridad. Gestionamos los riesgos en cada etapa para proteger a las personas y cuidar las instalaciones.',
  ],
  mision:
    'Prestar servicios de ingeniería y mantenimiento industrial que respondan a las necesidades de cada cliente. Trabajamos en coordinación con sus equipos y gestionamos los riesgos en cada etapa para proteger a las personas y cuidar las instalaciones.',
  vision:
    'Ser reconocidos como un socio de confianza en ingeniería y mantenimiento industrial en los sectores minero, alimentario, cosmético y químico. Aspiramos a construir relaciones de largo plazo con nuestros clientes a través de un trabajo seguro y una comunicación cercana.',
  clientesTexto:
    'En Reserman elegimos trabajar con un grupo acotado de clientes para dedicarle a cada uno el tiempo y la atención que necesita. Nos involucramos desde el inicio, coordinamos cada trabajo con sus equipos y mantenemos una comunicación cercana. Así construimos relaciones de confianza que perduran en el tiempo.',
};

export const clientes: Cliente[] = [
  { nombre: 'IMDEX', logo: '/clientes/imdex.webp' },
  { nombre: 'Mathiesen', logo: '/clientes/mathiesen.webp' },
  { nombre: 'Agricovial', logo: '/clientes/agricovial.webp' },
  { nombre: 'Sanitas', logo: '/clientes/sanitas.webp' },
  { nombre: 'Impresores', logo: '/clientes/impresores.webp' },
];

export const servicios: Servicio[] = [
  {
    slug: 'ingenieria-y-proyectos-industriales',
    imagen: '/servicios/ingenieria-y-proyectos-industriales.webp',
    titulo: 'Ingeniería y proyectos industriales',
    tituloCorto: 'Ingeniería y proyectos',
    resumen:
      'Gestión y desarrollo técnico de proyectos industriales, desde la definición del alcance hasta la ejecución y entrega.',
    icono: 'proyectos',
    orden: 1,
    items: [
      'Asistencia de un ingeniero para el levantamiento técnico',
      'Elaboración de planos acotados en 2D y 3D',
      'Desarrollo de ingeniería mecánica',
      'Memorias de cálculo para estructuras',
    ],
    contenido: `
<p>Ingeniería de proyectos industriales: gestión y desarrollo técnico de proyectos industriales, desde la definición del alcance hasta la ejecución y entrega. Integra la coordinación de especialidades, la planificación, el control de costos, las compras técnicas y el aseguramiento de la calidad, para cumplir los requisitos técnicos, los plazos y el presupuesto. Aplicable a proyectos mecánicos y de procesos industriales, así como a trabajos de fabricación, montaje y mantenimiento.</p>
<h2>Diseño y fabricación de proyectos industriales según requerimientos</h2>
<ul>
<li>Asistencia de un ingeniero para el levantamiento técnico.</li>
<li>Recopilación de información relevante del proyecto.</li>
<li>Diseño y proyección de elementos mecánicos y estructurales.</li>
<li>Elaboración de planos esquemáticos acotados en 2D y 3D.</li>
<li>Reuniones de coordinación y revisión de diseños.</li>
<li>Desarrollo de ingeniería mecánica.</li>
<li>Elaboración de memorias de cálculo para estructuras.</li>
</ul>
`,
  },
  {
    slug: 'soldadura-y-fabricacion-industrial',
    imagen: '/servicios/soldadura-y-fabricacion-industrial.webp',
    titulo: 'Soldadura y fabricación industrial',
    tituloCorto: 'Soldadura y fabricación',
    resumen:
      'Soluciones en acero inoxidable y acero al carbono para las industrias alimentaria, farmacéutica y minera.',
    icono: 'soldadura',
    orden: 2,
    items: [
      'Fabricación de estanques, tolvas y equipos a medida',
      'Piping y montaje de cañerías industriales',
      'Plataformas, pasarelas, escaleras y estructuras metálicas',
      'Fabricación y montaje de redes contra incendio',
      'Reparaciones, mantenimiento y modificaciones de instalaciones',
    ],
    contenido: `
<p>Desarrollamos proyectos desde el levantamiento en terreno y la elaboración de planos hasta la fabricación y el montaje, con foco en la calidad, la seguridad y los requerimientos de cada cliente.</p>
<h2>Nuestros servicios</h2>
<ul>
<li>Fabricación de estanques, tolvas y equipos a medida.</li>
<li>Piping y montaje de cañerías industriales.</li>
<li>Plataformas, pasarelas, escaleras y estructuras metálicas.</li>
<li>Fabricación y montaje de redes contra incendio.</li>
<li>Reparaciones, mantenimiento y modificaciones de instalaciones.</li>
</ul>
<p>Contamos con soldadores calificados y trabajamos en terreno con los equipos, herramientas y elementos de protección necesarios, cumpliendo las exigencias de seguridad de cada instalación.</p>
<blockquote>¿Tiene una idea o un proyecto? Desarrollamos los planos y lo llevamos a la realidad.</blockquote>
`,
  },
  {
    slug: 'mantenimiento-industrial',
    imagen: '/servicios/mantenimiento-industrial.webp',
    titulo: 'Mantenimiento industrial',
    tituloCorto: 'Mantenimiento industrial',
    resumen: 'Cuidamos tus equipos para mantener tu operación en movimiento.',
    icono: 'mantenimiento',
    orden: 3,
    items: [
      'Mantenimiento preventivo',
      'Mantenimiento correctivo',
      'Inspección técnica',
      'En nuestro taller o en terreno',
    ],
    contenido: `
<p>Ofrecemos servicios de mantenimiento preventivo y correctivo para equipos industriales, tanto en nuestro taller como directamente en tus instalaciones. Adaptamos cada intervención a las necesidades de tu operación, con foco en la seguridad, la confiabilidad y la continuidad productiva.</p>
<h2>Mantenimiento en nuestro taller</h2>
<p>Realizamos la revisión, el diagnóstico, la reparación y el ajuste de equipos y componentes industriales. Evaluamos su condición para definir los trabajos necesarios y recuperar su funcionamiento.</p>
<h2>Mantenimiento en terreno</h2>
<p>Nos trasladamos a tus instalaciones para realizar inspecciones, mantenimiento programado y reparaciones. Atendemos tus equipos en su lugar de operación, facilitando la intervención de maquinaria que requiere atención en planta.</p>
<h2>Soluciones para tu industria</h2>
<ul>
<li><strong>Mantenimiento preventivo:</strong> trabajos programados para anticipar fallas y prolongar la vida útil de tus equipos.</li>
<li><strong>Mantenimiento correctivo:</strong> diagnóstico y reparación para restablecer su operatividad.</li>
<li><strong>Inspección técnica:</strong> evaluación del estado de equipos y componentes para identificar necesidades de intervención.</li>
</ul>
<blockquote>En nuestro taller o en tu planta, somos tu aliado en mantenimiento industrial.</blockquote>
`,
  },
  {
    slug: 'montaje-mecanico-industrial',
    imagen: '/servicios/montaje-mecanico-industrial.webp',
    titulo: 'Montaje mecánico industrial',
    tituloCorto: 'Montaje mecánico',
    resumen:
      'Izajes, retiro de equipamiento y montaje de equipos industriales para proyectos de instalación, recambio y ampliación de plantas.',
    icono: 'montaje',
    orden: 4,
    items: [
      'Izaje y posicionamiento de cargas',
      'Desmontaje y retiro de equipamiento',
      'Montaje de equipos industriales',
      'Trabajos complementarios',
    ],
    contenido: `
<p>Planificamos cada maniobra según las características de la carga, los accesos y las condiciones de operación de la planta.</p>
<ul>
<li><strong>Izaje y posicionamiento de cargas.</strong> Levantamiento, desplazamiento y ubicación de maquinaria, componentes y estructuras metálicas.</li>
<li><strong>Desmontaje y retiro de equipamiento.</strong> Desarme, extracción y traslado interno de equipos en desuso o que requieren reemplazo.</li>
<li><strong>Montaje de equipos industriales.</strong> Instalación, nivelación, alineación y anclaje de equipos como bombas, motores, reductores y transportadores.</li>
<li><strong>Trabajos complementarios.</strong> Montaje de bases, soportes, plataformas y estructuras auxiliares asociadas a la instalación.</li>
</ul>
<p>Coordinamos los trabajos con los equipos de operaciones y mantenimiento para integrarlos a las ventanas de intervención de la planta, con foco en la seguridad de las maniobras y la correcta instalación de los equipos.</p>
<blockquote><strong>Solicita una cotización.</strong> Cuéntanos qué equipo necesitas izar, retirar o instalar y en qué planta se realizará el trabajo.</blockquote>
`,
  },
  {
    slug: 'ingenieria-electrica',
    imagen: '/servicios/ingenieria-electrica.webp',
    titulo: 'Ingeniería eléctrica',
    tituloCorto: 'Ingeniería eléctrica',
    resumen:
      'Soluciones de ingeniería eléctrica para proyectos industriales y comerciales: diseño, fabricación, modernización y mantenimiento de instalaciones.',
    icono: 'electrica',
    orden: 5,
    items: [
      'Fabricación de tableros eléctricos',
      'Proyectos eléctricos para plantas industriales',
      'Estudios y levantamientos eléctricos',
      'Modernización de tableros de fuerza y control',
      'Búsqueda y reparación de fallas eléctricas',
      'Proyectos de iluminación LED',
    ],
    contenido: `
<p>En RESERMAN ofrecemos soluciones de ingeniería eléctrica para proyectos industriales y comerciales. Apoyamos a nuestros clientes en el diseño, fabricación, modernización y mantenimiento de sus instalaciones, con foco en la seguridad, la continuidad operativa y el uso eficiente de la energía.</p>
<h2>Nuestros servicios</h2>
<ul>
<li><strong>Fabricación de tableros eléctricos:</strong> tableros de distribución, fuerza y alumbrado, desarrollados según los requerimientos de cada instalación.</li>
<li><strong>Proyectos eléctricos para plantas industriales:</strong> diseño de sistemas de fuerza, alumbrado, control y corrientes débiles.</li>
<li><strong>Estudios y levantamientos eléctricos:</strong> evaluación de instalaciones existentes y recopilación de información técnica para planificar mejoras, ampliaciones y actualizaciones.</li>
<li><strong>Modernización de tableros de fuerza y control:</strong> actualización de equipos y componentes para mejorar su funcionamiento y facilitar su mantenimiento.</li>
<li><strong>Búsqueda y reparación de fallas eléctricas:</strong> diagnóstico y solución de problemas en instalaciones, circuitos y equipos eléctricos.</li>
<li><strong>Proyectos de iluminación LED:</strong> diseño de soluciones de iluminación orientadas a mejorar la visibilidad, optimizar el consumo y reducir los costos de operación.</li>
</ul>
<blockquote><strong>Conversemos sobre su próximo proyecto.</strong> ¿Necesita desarrollar una instalación, modernizar sus tableros o resolver una falla eléctrica? Cuéntenos sus requerimientos y evaluemos una solución para su empresa.</blockquote>
`,
  },
  {
    slug: 'obras-civiles-menores',
    imagen: '/servicios/obras-civiles-menores.webp',
    titulo: 'Obras civiles menores para la industria',
    tituloCorto: 'Obras civiles menores',
    resumen:
      'Construimos, reparamos y mejoramos sus instalaciones para apoyar la continuidad de su operación.',
    icono: 'civiles',
    orden: 6,
    items: [
      'Radieres y pavimentos',
      'Albañilería y reparaciones',
      'Adecuación de espacios',
      'Techumbres e impermeabilización',
      'Pintura y terminaciones',
      'Obras complementarias',
      'Aire acondicionado y climatización',
    ],
    contenido: `
<p>Realizamos obras civiles menores y mantenimiento de infraestructura para plantas industriales, bodegas, centros de distribución e instalaciones productivas. Nos enfocamos en soluciones duraderas, una ejecución segura y la coordinación de los trabajos con las actividades de su empresa.</p>
<h2>Nuestros servicios</h2>
<ul>
<li><strong>Radieres y pavimentos:</strong> construcción y reparación de superficies de hormigón para áreas de trabajo, circulación y almacenamiento.</li>
<li><strong>Albañilería y reparaciones:</strong> ejecución y reparación de muros, tabiques, estucos y elementos de infraestructura.</li>
<li><strong>Adecuación de espacios:</strong> remodelación de oficinas, baños, vestidores, comedores y áreas de apoyo a la operación.</li>
<li><strong>Techumbres e impermeabilización:</strong> reparación de cubiertas, sellado de filtraciones y mantenimiento de canaletas y bajadas de aguas lluvias.</li>
<li><strong>Pintura y terminaciones:</strong> renovación y protección de superficies interiores y exteriores.</li>
<li><strong>Obras complementarias:</strong> construcción y reparación de accesos, veredas, soleras, cierres perimetrales y sistemas de drenaje.</li>
<li><strong>Aire acondicionado y climatización:</strong> instalación, mantenimiento preventivo y reparación de equipos de aire acondicionado para oficinas, salas de control y otras áreas de apoyo en plantas industriales y centros de distribución.</li>
</ul>
<h2>Trabajos coordinados con su operación</h2>
<p>Planificamos cada intervención según las condiciones de sus instalaciones, los accesos disponibles y los horarios de trabajo. Nuestro objetivo es reducir las interferencias con la actividad productiva y entregar espacios funcionales, con terminaciones acordes al uso industrial.</p>
`,
  },
];

export const navegacion = [
  { label: 'Inicio', href: '/' },
  { label: 'Somos', href: '/somos' },
  {
    label: 'Soluciones',
    href: '/soluciones',
    children: servicios.map((s) => ({ label: s.tituloCorto, href: `/soluciones/${s.slug}` })),
  },
  { label: 'Contacto', href: '/contacto' },
];
