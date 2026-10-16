/**
 * DATOS FIJOS (fallback).
 * Se usan mientras no haya acceso al WordPress de reserman.cl/admin.
 * Cuando WP esté disponible, src/lib/wp.ts reemplaza estos datos
 * con lo que devuelva la REST API (misma forma de objetos).
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
  icono: 'gestion' | 'procesos' | 'mantenimiento' | 'ingenieria';
  pregunta?: string;      // gancho tipo "¿Te sientes agobiado...?"
  claim?: string;         // "TRANQUILO, TE AYUDAREMOS"
  contenido: string;      // HTML
  imagen?: string;        // fondo de la card / cabecera
  items?: string[];
  destacado?: boolean;
  orden: number;
}

export interface Somos {
  titulo: string;
  intro: string;
  mision: string;
  vision: string;
  valores: string[];
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

/** Slider del home: 3 slides. Cuando exista WP, se puede alimentar desde un CPT `slide`. */
export const slides: Slide[] = [
  {
    eyebrow: 'Soluciones industriales',
    titulo: 'Un partner estratégico para <span class="text-amber-500">optimizar tus procesos productivos</span>',
    texto:
      'Gestión del mantenimiento, optimización de procesos, servicios de mantenimiento e ingeniería para plantas de alimentos, químicas y cosméticas.',
    cta: { label: 'Solicitar cotización', href: '/contacto' },
    ctaSecundario: { label: 'Ver soluciones', href: '/soluciones' },
    imagen: '/slides/slide-1.webp',
    gradiente: 'bg-[linear-gradient(100deg,rgba(11,42,58,0.78)_0%,rgba(11,42,58,0.5)_45%,rgba(11,42,58,0.18)_100%)]',
  },
  {
    eyebrow: 'Gestión del mantenimiento',
    titulo: '¿Sumergido en el mantenimiento correctivo? <span class="text-amber-500">Tranquilo, te ayudamos</span>',
    texto:
      'Auditorías de la gestión del mantenimiento basadas en PAS 55 e ISO 55000 para detectar brechas y establecer focos de mejora con información objetiva.',
    cta: { label: 'Conocer la auditoría', href: '/soluciones/gestion-del-mantenimiento' },
    ctaSecundario: { label: 'Cotizar', href: '/contacto' },
    imagen: '/slides/slide-2.webp',
    gradiente: 'bg-[linear-gradient(100deg,rgba(11,42,58,0.78)_0%,rgba(11,42,58,0.5)_45%,rgba(11,42,58,0.18)_100%)]',
  },
  {
    eyebrow: 'Optimización de procesos',
    titulo: '¿No logras cumplir el programa de producción? <span class="text-amber-500">Optimizamos tu línea</span>',
    texto:
      'Levantamientos en línea, turno completo, con un informe final que radiografía las deficiencias mecánicas, de proceso, operacionales y de materiales.',
    cta: { label: 'Ver metodología', href: '/soluciones/optimizacion-de-procesos' },
    ctaSecundario: { label: 'Cotizar', href: '/contacto' },
    imagen: '/slides/slide-3.webp',
    gradiente: 'bg-[linear-gradient(100deg,rgba(11,42,58,0.78)_0%,rgba(11,42,58,0.5)_45%,rgba(11,42,58,0.18)_100%)]',
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
    'Reserman es una empresa nueva en el mercado, pero la experiencia que respalda nuestro portafolio técnico se forja a través de años liderando departamentos de mantenimiento, ingeniería y prevención de riesgos en empresas del ámbito alimentario, químico y cosmético. Tras más de una década contribuyendo al negocio desde dentro de la organización, y entendiendo profundamente las necesidades y estrategias de las áreas operativas, Reserman se embarca en un servicio externo construido sobre experiencia y buenos resultados. Nuestro compromiso es total en la búsqueda de aumentar la rentabilidad de tu negocio.',
  mision:
    'Facilitar la gestión del mantenimiento y contribuir a la eficiencia de los procesos productivos a través de una colaboración oportuna y a costos razonables.',
  vision:
    'Ser un partner estratégico que permita a los líderes de operaciones enfocarse en las actividades importantes, a través de soluciones que busquen el máximo rendimiento de los procesos productivos.',
  valores: ['Transparencia', 'Confianza', 'Honestidad', 'Compromiso', 'Excelencia'],
};

export const servicios: Servicio[] = [
  {
    slug: 'gestion-del-mantenimiento',
    imagen: '/servicios/gestion-del-mantenimiento.webp',
    titulo: 'Gestión del Mantenimiento',
    tituloCorto: 'Gestión del Mantenimiento',
    resumen:
      'Auditorías de la gestión del mantenimiento en plantas industriales, basadas en gestión de activos (PAS 55 / ISO 55000), para detectar brechas y establecer focos de mejora.',
    icono: 'gestion',
    pregunta:
      '¿Te sientes agobiado por estar sumergido en el mantenimiento correctivo y consumido por el día a día?',
    claim: 'Tranquilo, te ayudaremos',
    orden: 1,
    destacado: true,
    contenido: `
<h2>Auditorías para la Gestión del Mantenimiento</h2>
<p>Reserman realiza auditorías de mantenimiento en plantas industriales para determinar si la gestión se está realizando bajo los aspectos clave que permiten un mejor desempeño del área técnica de la compañía.</p>
<p>El área de Mantenimiento tiene un rol estratégico dentro de la Excelencia Operacional de una planta industrial: debe asegurar la disponibilidad de los activos a costos razonables, por lo que requiere que sus procesos se desempeñen de forma eficaz y eficiente. La Gerencia de Mantenimiento necesita contar con información objetiva y oportuna sobre el nivel de desempeño de sus procesos, de manera de establecer focos de acción sobre los casos relevantes y mitigar los riesgos asociados.</p>
<h3>Una auditoría te ayuda a responder preguntas como:</h3>
<ul>
<li>¿Conoce la Gerencia de Mantenimiento las fortalezas y debilidades de sus procesos, de modo de identificar brechas y desarrollar acciones de mejora?</li>
<li>¿Las estrategias y planes de mantenimiento de los activos críticos permiten lograr los niveles de confiabilidad requeridos por la planta?</li>
<li>¿El personal llena correctamente los registros, en papel y digital, generando información útil para analizar y mejorar los procesos?</li>
</ul>
<p>Una auditoría de mantenimiento consiste en comparar la situación existente en la empresa con un modelo de excelencia o de clase mundial. La auditoría propuesta está basada en los conceptos de gestión de activos y en las normas <strong>PAS 55</strong> e <strong>ISO 55000</strong>, con una visión práctica y aplicada a la realidad de cada planta.</p>
`,
  },
  {
    slug: 'optimizacion-de-procesos',
    imagen: '/servicios/optimizacion-de-procesos.webp',
    titulo: 'Optimización de Procesos',
    tituloCorto: 'Optimización de Procesos',
    resumen:
      'Levantamientos transversales en línea para detectar las causas que impiden el máximo rendimiento de tus procesos productivos: análisis técnico, de proceso, operacional y de materiales.',
    icono: 'procesos',
    pregunta: '¿No logras cumplir con el programa de producción?',
    claim: 'Optimizamos tus procesos productivos',
    orden: 2,
    destacado: true,
    items: ['Análisis técnico', 'Análisis de proceso', 'Análisis operacional', 'Análisis de materiales'],
    contenido: `
<p>Muchas y diferentes son las situaciones que dificultan obtener una producción eficiente, y pocos son los recursos disponibles en las organizaciones para optimizar procesos que cumplan las expectativas para las que fueron adquiridos. Por eso Reserman ofrece rigurosos levantamientos transversales para detectar las causas que no permiten conseguir el máximo rendimiento de los procesos productivos. Además, contamos con proveedores estratégicos que permiten desarrollar soluciones de ingeniería en la búsqueda de la optimización.</p>
<p>Los procesos productivos en su mayoría presentan deficiencias de distinto origen —mecánico, de proceso, operacional o de materiales— que impactan en el rendimiento esperado de los equipos. <strong>La mayoría de las empresas opera con niveles de OEE por debajo del 70%</strong>, lo que supone una importante pérdida de dinero y un gran margen para la mejora.</p>
<h2>¿Cómo lo hacemos?</h2>
<p>Para identificar las desviaciones de un proceso productivo es fundamental observar turnos completos directamente en la línea con problemas, con el objetivo de detectar todos los elementos que no permiten la continuidad del proceso o que no contribuyen a la eficiencia.</p>
<h3>Metodología en 5 pasos</h3>
<ol>
<li>Identificación de la línea con incumplimientos del programa productivo.</li>
<li>Recopilación de información relevante de la línea (conversación con operadores y líderes).</li>
<li>Análisis de la línea de inicio a fin, más sus procesos vinculantes.</li>
<li>Análisis de los datos obtenidos.</li>
<li>Entrega del informe final.</li>
</ol>
<p>El informe final es una radiografía con información objetiva y concreta sobre los aspectos que no generan valor al proceso productivo, para establecer planes de acción que aumenten el rendimiento de la línea.</p>
<h2>Tipos de deficiencias que impactan un proceso productivo</h2>
<h3>Deficiencias mecánicas</h3>
<p>Toda detención provocada por equipos, componentes o sistemas de la línea de producción que no permite conseguir el rendimiento esperado. Por ejemplo, en una línea de envasado de líquidos en frascos de 1 L:</p>
<ul>
<li>Dificultades en los traspasos de frascos de un equipo a otro (caídas constantes).</li>
<li>Guías de transporte con diseño deficiente o mal ajustadas que dificultan el flujo (trabamiento).</li>
<li>Cambios de formato mal realizados que generan detenciones durante el turno.</li>
<li>Herramientas incorrectas o poco eficientes que impiden trabajar de forma segura y eficiente.</li>
<li>Averías constantes (mecánicas, eléctricas, de instrumentación) que retrasan la producción.</li>
<li>Cuellos de botella.</li>
</ul>
<h3>Deficiencias de proceso, operacionales y de materiales</h3>
<p>Situaciones propias del proceso, de la operación o de los insumos que reducen el rendimiento de la línea. Se levantan y documentan con la misma metodología para construir un plan de acción integral.</p>
`,
  },
  {
    slug: 'servicios-de-mantenimiento',
    imagen: '/servicios/servicios-de-mantenimiento.webp',
    titulo: 'Servicios de Mantenimiento',
    tituloCorto: 'Servicios de Mantenimiento',
    resumen:
      'Planes de mantenimiento a convenir. Nos hacemos cargo de las actividades secundarias para que tu equipo se enfoque en las tareas fundamentales del departamento.',
    icono: 'mantenimiento',
    orden: 3,
    items: [
      'Mantenimiento preventivo de equipos menores o auxiliares',
      'Desarme de maquinarias y equipos bajo supervisión local',
      'Limpieza de máquinas y equipos en stand by o en mantenimiento',
      'Lubricación rutinaria bajo programa semanal',
      'Limpieza industrial (muros, pisos, utensilios de producción)',
      'Apoyo en paradas de planta o mantenimientos preventivos',
    ],
    contenido: `
<p>Reserman ofrece planes de mantenimiento a convenir con el cliente según sus necesidades. Nuestra propuesta busca hacernos cargo de las actividades secundarias y permitir que el equipo de mantenimiento de la empresa se enfoque en las tareas fundamentales del departamento.</p>
<h2>Actividades</h2>
<ul>
<li>Mantenimiento preventivo de equipos menores o auxiliares.</li>
<li>Desarme de maquinarias y/o equipos bajo supervisión local.</li>
<li>Limpieza de máquinas y/o equipos en stand by o en proceso de mantenimiento.</li>
<li>Lubricación rutinaria bajo un programa semanal.</li>
<li>Limpieza industrial (muros, pisos, utensilios de producción).</li>
<li>Apoyo secundario en paradas de planta o mantenimientos preventivos.</li>
</ul>
<h2>Ejemplos de trabajos realizados</h2>
<ul>
<li>Limpieza general de máquinas Doypack.</li>
<li>Limpieza de rodillos de transporte de pallets.</li>
<li>Mantenimiento y limpieza de rodillos motorizados (transporte de cajas).</li>
<li>Limpieza general de máquina sachetera.</li>
</ul>
`,
  },
  {
    slug: 'servicios-de-ingenieria',
    imagen: '/servicios/servicios-de-ingenieria.webp',
    titulo: 'Servicios de Ingeniería',
    tituloCorto: 'Servicios de Ingeniería',
    resumen:
      'Instalaciones eléctricas industriales y fabricación y montaje de estructuras metálicas, con especialidad en acero inoxidable.',
    icono: 'ingenieria',
    orden: 4,
    items: [
      'Fabricación y montaje de estructuras metálicas (especialistas en inoxidable)',
      'Instalación eléctrica industrial',
      'Proyectos de plantas industriales (fuerza, alumbrado, control, corrientes débiles)',
      'Estudio de instalaciones existentes y levantamientos eléctricos',
      'Modernización de tableros de fuerza y control',
      'Búsqueda y reparación de fallas eléctricas',
      'Armado de tableros eléctricos de distribución, fuerza y alumbrado',
    ],
    contenido: `
<h2>Fabricación y montaje de estructuras metálicas</h2>
<p>Diseño, fabricación y montaje de estructuras metálicas para la industria, con especialidad en <strong>acero inoxidable</strong> para plantas de alimentos, químicas y cosméticas.</p>
<h2>Instalación eléctrica industrial</h2>
<ul>
<li>Proyectos de plantas industriales (fuerza, alumbrado, control, corrientes débiles).</li>
<li>Estudio de instalaciones existentes y levantamientos eléctricos.</li>
<li>Modernización de tableros de fuerza y control.</li>
<li>Búsqueda y reparación de fallas eléctricas en general.</li>
<li>Armado de tableros eléctricos de distribución, fuerza y alumbrado.</li>
</ul>
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
