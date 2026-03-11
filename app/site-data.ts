export type FeedEntry = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
  cta: string;
};

export type Person = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/research", label: "Research" },
  { href: "/quienes-somos", label: "Quienes somos" },
];

export const contactLinks = [
  {
    label: "LinkedIn",
    value: "Club de Finanzas UBA",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
  },
  {
    label: "Instagram",
    value: "@clubdefinanzasuba",
    href: "https://instagram.com/clubdefinanzasuba",
  },
  {
    label: "WhatsApp",
    value: "Canal oficial",
    href: "https://whatsapp.com/channel/clubdefinanzasuba",
  },
  {
    label: "Mail",
    value: "hola@clubdefinanzasuba.com",
    href: "mailto:hola@clubdefinanzasuba.com",
  },
];

export const homeFeatured = {
  category: "Destacada de la semana",
  date: "11 de marzo de 2026",
  title: "Convocatoria abierta: charla sobre macro, carry trade y valuacion para estudiantes UBA",
  excerpt:
    "Una invitacion en formato editorial para empujar asistencia, sumar comunidad y marcar agenda. La pieza principal ocupa la home completa y funciona como noticia del dia o promocion de un evento clave.",
  href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
  cta: "Ver invitacion completa",
};

export const homeFeed: FeedEntry[] = [
  {
    category: "Portfolio",
    date: "Febrero 2026",
    title: "Portfolio Estrategia 2026",
    excerpt:
      "Lectura del escenario 2026, criterios de asignacion y construccion de una cartera diversificada con foco academico y practico.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_estrategia-2026-portafolio-ugcPost-7427859546221547520-MIMs?utm_source=social_share_send&utm_medium=ios_app&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q&utm_campaign=copy_link",
    cta: "Ir a LinkedIn",
  },
  {
    category: "Research",
    date: "Diciembre 2025",
    title: "Publicacion de Ratios Financieros - Price to Earnings (P/E)",
    excerpt:
      "Una pieza para bajar conceptos tecnicos a una lectura clara, util y aplicable para estudiantes y jovenes profesionales.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_ratios-financieros-price-to-earnings-p-activity-7402128083065053185-ry6f?utm_source=share&utm_medium=member_ios&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q",
    cta: "Leer analisis",
  },
  {
    category: "Invitaciones",
    date: "Marzo 2026",
    title: "Workshop interno: modelizacion financiera aplicada a casos reales",
    excerpt:
      "Actividad del club para reforzar la propuesta academica y mostrar profundidad de trabajo mas alla de redes.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Ver detalle",
  },
  {
    category: "Research",
    date: "Noviembre 2025",
    title: "Riesgo pais, spread y duration: una lectura para no especialistas",
    excerpt:
      "Pieza de educacion financiera con tono serio y estructura visual de informe breve.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Abrir informe",
  },
  {
    category: "Portfolio",
    date: "Octubre 2025",
    title: "Seguimiento del portafolio de renta mixta local - mayo",
    excerpt:
      "Seguimiento de una cartera local con criterio de riesgo, horizonte y consistencia metodologica.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_seguimiento-portfolio-renta-mixta-local-activity-7399929441407111168-m_3T?utm_medium=ios_app&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q&utm_source=social_share_send&utm_campaign=copy_link",
    cta: "Ver seguimiento",
  },
];

export const portfolioIntro =
  "Area enfocada en construccion y seguimiento de carteras, asset allocation y lectura tactica de mercado. El feed prioriza piezas accionables, consistentes y faciles de recorrer.";

export const portfolioFeed: FeedEntry[] = [
  {
    category: "Asignacion",
    date: "Febrero 2026",
    title: "Portfolio Estrategia 2026",
    excerpt:
      "Lectura del escenario 2026, criterios de asignacion y construccion de una cartera diversificada con foco academico y practico.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_estrategia-2026-portafolio-ugcPost-7427859546221547520-MIMs?utm_source=social_share_send&utm_medium=ios_app&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q&utm_campaign=copy_link",
    cta: "Ver publicacion",
  },
  {
    category: "Renta fija",
    date: "Febrero 2026",
    title: "Bonos hard dollar vs. CER: criterios para decidir sin ruido",
    excerpt:
      "Comparativo sintetico de carry, sensibilidad y escenarios para discutir posicionamiento con mayor precision.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Leer analisis",
  },
  {
    category: "Seguimiento",
    date: "Octubre 2025",
    title: "Seguimiento del portafolio de renta mixta local - mayo",
    excerpt:
      "Seguimiento de una cartera local con criterio de riesgo, horizonte y consistencia metodologica.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_seguimiento-portfolio-renta-mixta-local-activity-7399929441407111168-m_3T?utm_medium=ios_app&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q&utm_source=social_share_send&utm_campaign=copy_link",
    cta: "Abrir post",
  },
  {
    category: "Metodologia",
    date: "Diciembre 2025",
    title: "Como documentamos decisiones de cartera dentro del club",
    excerpt:
      "Proceso, criterios y disciplina para que cada movimiento tenga justificacion y trazabilidad.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Ver metodologia",
  },
];

export const researchIntro =
  "Research concentra informes, marcos conceptuales y piezas de lectura profunda. La idea es que el usuario encuentre un feed limpio y una descripcion clara del area antes de bajar a los contenidos.";

export const researchFeed: FeedEntry[] = [
  {
    category: "Research + Portfolio",
    date: "Diciembre 2025",
    title: "Publicacion de Ratios Financieros - Price to Earnings (P/E)",
    excerpt:
      "Una pieza para bajar conceptos tecnicos a una lectura clara, util y aplicable para estudiantes y jovenes profesionales.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_ratios-financieros-price-to-earnings-p-activity-7402128083065053185-ry6f?utm_source=share&utm_medium=member_ios&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q",
    cta: "Leer informe",
  },
  {
    category: "Educacion",
    date: "Febrero 2026",
    title: "Duration explicada desde cero y aplicada a bonos locales",
    excerpt:
      "Articulo breve para alumnos que necesitan una entrada clara al concepto antes de ir a un informe completo.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Abrir nota",
  },
  {
    category: "Valuacion",
    date: "Enero 2026",
    title: "DCF en lenguaje simple: supuestos, errores frecuentes y uso real",
    excerpt:
      "Pieza orientada a entrenamiento tecnico con una bajada visual apta para feed.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Ver explicacion",
  },
  {
    category: "Mercado",
    date: "Diciembre 2025",
    title: "Riesgo pais y spreads: por que importan y que no te dicen solos",
    excerpt:
      "Analisis corto con foco en interpretacion, no en repetir indicadores sin contexto.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Ir al contenido",
  },
];

export const storyBlocks = [
  {
    title: "Trayectoria",
    text: "El club surge desde la UBA para transformar interes en finanzas en produccion real: informes, publicaciones, charlas y comunidad.",
  },
  {
    title: "Objetivo",
    text: "Construir una plataforma estudiantil con nivel editorial y tecnico, capaz de dialogar con alumnos, graduados, speakers y aliados.",
  },
  {
    title: "Forma de trabajo",
    text: "Cada area produce contenido con identidad propia, pero dentro de una marca comun que prioriza claridad, criterio y continuidad.",
  },
];

export const objectives = [
  "Acercar finanzas a estudiantes con lenguaje claro y exigencia tecnica.",
  "Publicar piezas que sirvan tanto para aprender como para mostrar trabajo serio.",
  "Generar una comunidad activa alrededor de informes, eventos y oportunidades.",
  "Consolidar una marca universitaria atractiva para partners, speakers y sponsors.",
];

export const leadership: Person[] = [
  {
    name: "Julian Robin",
    role: "Co-founder",
    bio: "Impulsa la direccion general del club y la construccion de alianzas, eventos y narrativa institucional.",
    initials: "JR",
  },
  {
    name: "Ale",
    role: "Contenido y noticias",
    bio: "Aporta lectura de coyuntura y una voz mas agil para bajar mercado a formatos rapidos y consistentes.",
    initials: "AL",
  },
  {
    name: "Equipo Research",
    role: "Analisis e informes",
    bio: "Desarrolla piezas tecnicas, marcos conceptuales y publicaciones de educacion financiera.",
    initials: "RE",
  },
  {
    name: "Equipo Portfolio",
    role: "Seguimiento de cartera",
    bio: "Trabaja estrategias, asset allocation y seguimiento metodologico de ideas de inversion.",
    initials: "PF",
  },
];
