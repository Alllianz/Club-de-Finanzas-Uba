export type FeedEntry = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
  cta: string;
  imageUrl?: string;
};

export type Person = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  imageUrl?: string | null;
  profileUrl?: string | null;
  section?: "LEADERSHIP" | "PORTFOLIO" | "RESEARCH" | "RRII";
};

export type NavigationItem = {
  href: string;
  label: string;
};

export const navigation: NavigationItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/research", label: "Research" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/monitor-global", label: "Datos Fin." },
  { href: "/sobre-nosotros", label: "Sobre Nos" },
  { href: "/unite", label: "Unite" },
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
  title: "Convocatoria abierta: charla sobre macro, carry trade y valuación para estudiantes UBA",
  excerpt:
    "Una invitación en formato editorial para empujar asistencia, sumar comunidad y marcar agenda. La pieza principal ocupa la home completa y funciona como noticia del día o promoción de un evento clave.",
  href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
  cta: "Ver invitación completa",
};

export const homeFeed: FeedEntry[] = [
  {
    category: "Portfolio",
    date: "Febrero 2026",
    title: "Portfolio Estrategia 2026",
    excerpt:
      "Lectura del escenario 2026, criterios de asignación y construcción de una cartera diversificada con foco académico y práctico.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_estrategia-2026-portafolio-ugcPost-7427859546221547520-MIMs?utm_source=social_share_send&utm_medium=ios_app&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q&utm_campaign=copy_link",
    cta: "Ir a LinkedIn",
  },
  {
    category: "Research",
    date: "Diciembre 2025",
    title: "Publicación de Ratios Financieros - Price to Earnings (P/E)",
    excerpt:
      "Una pieza para bajar conceptos técnicos a una lectura clara, útil y aplicable para estudiantes y jóvenes profesionales.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_ratios-financieros-price-to-earnings-p-activity-7402128083065053185-ry6f?utm_source=share&utm_medium=member_ios&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q",
    cta: "Leer análisis",
  },
  {
    category: "Invitaciones",
    date: "Marzo 2026",
    title: "Workshop interno: modelización financiera aplicada a casos reales",
    excerpt:
      "Actividad del club para reforzar la propuesta académica y mostrar profundidad de trabajo más allá de redes.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Ver detalle",
  },
  {
    category: "Research",
    date: "Noviembre 2025",
    title: "Riesgo país, spread y duration: una lectura para no especialistas",
    excerpt:
      "Pieza de educación financiera con tono serio y estructura visual de informe breve.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Abrir informe",
  },
  {
    category: "Portfolio",
    date: "Octubre 2025",
    title: "Seguimiento del portafolio de renta mixta local - mayo",
    excerpt:
      "Seguimiento de una cartera local con criterio de riesgo, horizonte y consistencia metodológica.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_seguimiento-portfolio-renta-mixta-local-activity-7399929441407111168-m_3T?utm_medium=ios_app&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q&utm_source=social_share_send&utm_campaign=copy_link",
    cta: "Ver seguimiento",
  },
];

export const portfolioIntro =
  "Área enfocada en construcción y seguimiento de carteras, asset allocation y lectura táctica de mercado. El feed prioriza piezas accionables, consistentes y fáciles de recorrer.";

export const portfolioFeed: FeedEntry[] = [
  {
    category: "Asignación",
    date: "Febrero 2026",
    title: "Portfolio Estrategia 2026",
    excerpt:
      "Lectura del escenario 2026, criterios de asignación y construcción de una cartera diversificada con foco académico y práctico.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_estrategia-2026-portafolio-ugcPost-7427859546221547520-MIMs?utm_source=social_share_send&utm_medium=ios_app&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q&utm_campaign=copy_link",
    cta: "Ver publicación",
  },
  {
    category: "Renta fija",
    date: "Febrero 2026",
    title: "Bonos hard dollar vs. CER: criterios para decidir sin ruido",
    excerpt:
      "Comparativo sintético de carry, sensibilidad y escenarios para discutir posicionamiento con mayor precisión.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Leer análisis",
  },
  {
    category: "Seguimiento",
    date: "Octubre 2025",
    title: "Seguimiento del portafolio de renta mixta local - mayo",
    excerpt:
      "Seguimiento de una cartera local con criterio de riesgo, horizonte y consistencia metodológica.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_seguimiento-portfolio-renta-mixta-local-activity-7399929441407111168-m_3T?utm_medium=ios_app&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q&utm_source=social_share_send&utm_campaign=copy_link",
    cta: "Abrir post",
  },
  {
    category: "Metodología",
    date: "Diciembre 2025",
    title: "Cómo documentamos decisiones de cartera dentro del club",
    excerpt:
      "Proceso, criterios y disciplina para que cada movimiento tenga justificación y trazabilidad.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Ver metodología",
  },
];

export const researchIntro =
  "Research concentra informes, marcos conceptuales y piezas de lectura profunda. La idea es que el usuario encuentre un feed limpio y una descripción clara del área antes de bajar a los contenidos.";

export const researchFeed: FeedEntry[] = [
  {
    category: "Research + Portfolio",
    date: "Diciembre 2025",
    title: "Publicación de Ratios Financieros - Price to Earnings (P/E)",
    excerpt:
      "Una pieza para bajar conceptos técnicos a una lectura clara, útil y aplicable para estudiantes y jóvenes profesionales.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_ratios-financieros-price-to-earnings-p-activity-7402128083065053185-ry6f?utm_source=share&utm_medium=member_ios&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q",
    cta: "Leer informe",
  },
  {
    category: "Educación",
    date: "Febrero 2026",
    title: "Duration explicada desde cero y aplicada a bonos locales",
    excerpt:
      "Artículo breve para alumnos que necesitan una entrada clara al concepto antes de ir a un informe completo.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Abrir nota",
  },
  {
    category: "Valuación",
    date: "Enero 2026",
    title: "DCF en lenguaje simple: supuestos, errores frecuentes y uso real",
    excerpt:
      "Pieza orientada a entrenamiento técnico con una bajada visual apta para feed.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Ver explicación",
  },
  {
    category: "Mercado",
    date: "Diciembre 2025",
    title: "Riesgo país y spreads: por qué importan y qué no te dicen solos",
    excerpt:
      "Análisis corto con foco en interpretación, no en repetir indicadores sin contexto.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Ir al contenido",
  },
];

export const newsIntro =
  "Noticias reúne novedades institucionales, agenda del club y cobertura de actividades para mantener a la comunidad informada con un formato claro y actualizado.";

export const newsFeed: FeedEntry[] = [
  {
    category: "Club",
    date: "Marzo 2026",
    title: "Agenda del club: actividades confirmadas para abril",
    excerpt:
      "Resumen de fechas, charlas y encuentros planificados para el proximo mes con links de seguimiento.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Ver agenda",
  },
  {
    category: "Eventos",
    date: "Marzo 2026",
    title: "Cobertura: encuentro de analisis macro con invitados del sector",
    excerpt:
      "Sintesis de los temas tratados, conclusiones clave y material complementario para la comunidad.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Leer cobertura",
  },
  {
    category: "Comunidad",
    date: "Febrero 2026",
    title: "Convocatoria abierta para sumar voluntarios al equipo editorial",
    excerpt:
      "Buscamos perfiles para redaccion, diseno y coordinacion de contenido institucional.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Postularme",
  },
  {
    category: "Institucional",
    date: "Febrero 2026",
    title: "Nuevo calendario de reuniones y comisiones de trabajo",
    excerpt:
      "Publicamos el calendario operativo para ordenar seguimiento de proyectos y responsabilidades.",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
    cta: "Ver calendario",
  },
];

export const storyBlocks = [
  {
    title: "Trayectoria",
    text: "El club surge desde la UBA para transformar interés en finanzas en producción real: informes, publicaciones, charlas y comunidad.",
  },
  {
    title: "Objetivo",
    text: "Construir una plataforma estudiantil con nivel editorial y técnico, capaz de dialogar con alumnos, graduados, speakers y aliados.",
  },
  {
    title: "Forma de trabajo",
    text: "Cada área produce contenido con identidad propia, pero dentro de una marca común que prioriza claridad, criterio y continuidad.",
  },
];

export const objectives = [
  "Acercar finanzas a estudiantes con lenguaje claro y exigencia técnica.",
  "Publicar piezas que sirvan tanto para aprender como para mostrar trabajo serio.",
  "Generar una comunidad activa alrededor de informes, eventos y oportunidades.",
  "Consolidar una marca universitaria atractiva para partners, speakers y sponsors.",
];

export const leadership: Person[] = [
  {
    name: "Julian Robin",
    role: "Co-founder",
    bio: "Impulsa la dirección general del club y la construcción de alianzas, eventos y narrativa institucional.",
    initials: "JR",
  },
  {
    name: "Ale",
    role: "Contenido y noticias",
    bio: "Aporta lectura de coyuntura y una voz más ágil para bajar mercado a formatos rápidos y consistentes.",
    initials: "AL",
  },
  {
    name: "Equipo Research",
    role: "Análisis e informes",
    bio: "Desarrolla piezas técnicas, marcos conceptuales y publicaciones de educación financiera.",
    initials: "RE",
  },
  {
    name: "Equipo Portfolio",
    role: "Seguimiento de cartera",
    bio: "Trabaja estrategias, asset allocation y seguimiento metodológico de ideas de inversión.",
    initials: "PF",
  },
];
