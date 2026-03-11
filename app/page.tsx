const publicaciones = [
  {
    fecha: "Febrero 2026",
    area: "Portfolio",
    titulo: "Portfolio Estrategia 2026",
    descripcion:
      "Lectura del escenario 2026, criterios de asignacion y construccion de una cartera diversificada con foco academico y practico.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_estrategia-2026-portafolio-ugcPost-7427859546221547520-MIMs?utm_source=social_share_send&utm_medium=ios_app&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q&utm_campaign=copy_link",
  },
  {
    fecha: "Diciembre 2025",
    area: "Research + Portfolio",
    titulo: "Ratios Financieros - Price to Earnings (P/E)",
    descripcion:
      "Una pieza para bajar conceptos tecnicos a una lectura clara, util y aplicable para estudiantes y jovenes profesionales.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_ratios-financieros-price-to-earnings-p-activity-7402128083065053185-ry6f?utm_source=share&utm_medium=member_ios&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q",
  },
  {
    fecha: "Octubre 2025",
    area: "Portfolio",
    titulo: "Seguimiento del portfolio de renta mixta local - mayo",
    descripcion:
      "Seguimiento de una cartera local con criterio de riesgo, horizonte y consistencia metodologica.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_seguimiento-portfolio-renta-mixta-local-activity-7399929441407111168-m_3T?utm_medium=ios_app&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q&utm_source=social_share_send&utm_campaign=copy_link",
  },
];

const fundamentos = [
  {
    titulo: "Quienes somos",
    descripcion:
      "Una comunidad impulsada por estudiantes y graduados que entiende a las finanzas como una disciplina que se estudia, se discute y se comparte.",
  },
  {
    titulo: "Mision",
    descripcion:
      "Transformar conocimiento tecnico en contenido claro, serio y abierto para ampliar el acceso a herramientas financieras de calidad.",
  },
  {
    titulo: "Vision",
    descripcion:
      "Consolidar una referencia joven y rigurosa dentro del ecosistema academico y profesional vinculado a la UBA.",
  },
];

const principios = [
  {
    numero: "01",
    titulo: "Rigor academico",
    descripcion:
      "Cada pieza busca sostener criterio, contexto y profundidad. No publicamos para llenar espacio.",
  },
  {
    numero: "02",
    titulo: "Lenguaje claro",
    descripcion:
      "Lo complejo se puede explicar bien. La claridad es parte de la propuesta, no una simplificacion vacia.",
  },
  {
    numero: "03",
    titulo: "Valor publico",
    descripcion:
      "El club existe para expandir el impacto de la educacion publica, conectando aprendizaje, circulacion y comunidad.",
  },
];

const areas = [
  {
    nombre: "Research",
    descripcion:
      "Analisis, ratios, lecturas sectoriales y marcos conceptuales para construir criterio financiero propio.",
  },
  {
    nombre: "Portfolio",
    descripcion:
      "Seguimiento de estrategias, asignacion de activos y discusiones de cartera con metodologia explicita.",
  },
  {
    nombre: "Educacion",
    descripcion:
      "Piezas introductorias, guias y formatos didacticos para quienes empiezan a formarse en finanzas.",
  },
  {
    nombre: "Comunidad",
    descripcion:
      "Canales, encuentros y articulaciones para reunir estudiantes, graduados, aliados y futuros sponsors.",
  },
];

const metodo = [
  "Detectamos temas relevantes para estudiantes y jovenes profesionales.",
  "Los bajamos a un formato editorial claro y visualmente consistente.",
  "Publicamos en canales donde la comunidad ya consume y comparte contenido.",
  "Usamos cada pieza para construir reputacion, continuidad y criterio colectivo.",
];

const audiencias = [
  "Estudiantes que buscan una entrada seria al mundo financiero.",
  "Graduados que quieren mantenerse conectados con una comunidad activa.",
  "Sponsors y aliados que valoran una marca universitaria con proyeccion.",
];

const enlaces = [
  {
    nombre: "WhatsApp",
    detalle: "Channel /clubdefinanzasuba",
    href: "https://whatsapp.com/channel/clubdefinanzasuba",
  },
  {
    nombre: "Instagram",
    detalle: "@clubdefinanzasuba",
    href: "https://instagram.com/clubdefinanzasuba",
  },
  {
    nombre: "LinkedIn",
    detalle: "Club de Finanzas UBA",
    href: "https://www.linkedin.com/company/club-de-finanzas-uba/",
  },
  {
    nombre: "X",
    detalle: "@ClubFinanzasUBA",
    href: "https://x.com/ClubFinanzasUBA",
  },
];

const aliados = [
  {
    titulo: "Para sponsors",
    descripcion:
      "Una marca universitaria con identidad clara, comunidad en crecimiento y piezas de alto valor percibido.",
  },
  {
    titulo: "Para speakers y partners",
    descripcion:
      "Charlas, contenidos, workshops y colaboraciones con foco academico y profesional.",
  },
  {
    titulo: "Para nuevos integrantes",
    descripcion:
      "Espacio para aprender, producir y participar en una estructura con areas definidas y proyeccion.",
  },
];

const faqs = [
  {
    pregunta: "Por que existe el club",
    respuesta:
      "Para convertir la formacion en finanzas en una experiencia compartida, publica y con proyeccion profesional.",
  },
  {
    pregunta: "Que diferencia al proyecto",
    respuesta:
      "La combinacion de identidad universitaria, lenguaje editorial y foco en contenido serio antes que promocional.",
  },
  {
    pregunta: "Como se vincula con la comunidad",
    respuesta:
      "A traves de publicaciones, canales activos, colaboraciones, convocatorias y futuros espacios de encuentro.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-ink)]">
      <header className="relative overflow-hidden border-b border-[var(--color-line)] bg-[radial-gradient(circle_at_top_left,_rgba(30,78,162,0.22),_transparent_36%),linear-gradient(180deg,#f8f6ef_0%,#f2ede1_100%)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-gold),#ffcf79,var(--color-blue))]" />
        <div className="absolute left-[-8rem] top-24 h-56 w-56 rounded-full border border-[rgba(18,63,137,0.14)]" />
        <div className="absolute right-[-5rem] top-12 h-72 w-72 rounded-full bg-[rgba(18,63,137,0.12)] blur-3xl" />
        <div className="absolute bottom-[-3rem] right-[8%] h-40 w-40 rotate-12 border border-[rgba(243,178,74,0.28)]" />

        <div className="mx-auto w-[min(1220px,92vw)] py-6">
          <nav className="flex flex-wrap items-center justify-between gap-4">
            <a href="#inicio" className="flex items-center gap-4">
              <div className="grid h-15 w-15 place-items-center rounded-full bg-[var(--color-blue)] text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_18px_60px_rgba(10,28,64,0.22)]">
                UBA
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[var(--color-blue)]">
                  Club de Finanzas
                </p>
                <p className="font-[family:var(--font-display)] text-[32px] leading-none">
                  UBA
                </p>
              </div>
            </a>

            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--color-muted)]">
              {[
                ["Manifiesto", "#manifiesto"],
                ["Areas", "#areas"],
                ["Publicaciones", "#publicaciones"],
                ["Alianzas", "#alianzas"],
                ["Comunidad", "#comunidad"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-full border border-[var(--color-line)] bg-white/85 px-4 py-2 transition hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div
          className="mx-auto grid w-[min(1220px,92vw)] gap-10 pb-16 pt-6 md:grid-cols-[minmax(0,1.25fr)_380px] md:pb-24 md:pt-10"
          id="inicio"
        >
          <div className="animate-rise">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--color-blue)]">
              Finanzas para la comunidad de la UBA
            </p>
            <h1 className="mt-5 max-w-5xl font-[family:var(--font-display)] text-5xl leading-[0.9] sm:text-6xl md:text-[88px]">
              Una marca academica con lenguaje editorial, criterio tecnico y
              vocacion de comunidad.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-muted)] md:text-xl">
              El Club de Finanzas UBA se presenta como una plataforma donde
              estudiantes y graduados convierten conocimiento financiero en
              publicaciones, conversaciones y proyectos con identidad propia.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#publicaciones"
                className="inline-flex items-center rounded-full bg-[var(--color-blue)] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[var(--color-blue-strong)]"
              >
                Explorar contenido
              </a>
              <a
                href="#alianzas"
                className="inline-flex items-center rounded-full border border-[var(--color-blue)] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-blue)] transition hover:bg-[var(--color-blue)] hover:text-white"
              >
                Ver colaboraciones
              </a>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-3">
              {[
                ["UBA", "Origen institucional"],
                ["Editorial", "Direccion de marca"],
                ["2026", "Etapa de consolidacion"],
              ].map(([valor, etiqueta]) => (
                <div key={etiqueta} className="bg-white/90 p-5">
                  <p className="font-[family:var(--font-display)] text-4xl text-[var(--color-blue)]">
                    {valor}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {etiqueta}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="animate-rise-delayed relative overflow-hidden border border-white/10 bg-[linear-gradient(180deg,#102d62_0%,#071633_100%)] p-7 text-white shadow-[0_30px_90px_rgba(10,28,64,0.28)]">
            <div className="absolute right-0 top-0 h-32 w-32 bg-[linear-gradient(135deg,rgba(243,178,74,0.92),rgba(243,178,74,0))]" />
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[rgba(255,255,255,0.66)]">
              Como nos definimos
            </p>
            <h2 className="mt-5 font-[family:var(--font-display)] text-4xl leading-tight">
              Publicamos para formar, conectar y elevar el nivel de la
              conversacion.
            </h2>
            <p className="mt-5 text-base leading-7 text-[rgba(255,255,255,0.78)]">
              La marca necesita verse menos como una pagina estudiantil
              improvisada y mas como una plataforma universitaria con criterio
              visual, continuidad y ambicion editorial.
            </p>
          </aside>
        </div>
      </header>

      <main>
        <section
          className="mx-auto w-[min(1220px,92vw)] py-16 md:py-24"
          id="manifiesto"
        >
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--color-blue)]">
                Quienes somos y por que hacemos esto
              </p>
              <h2 className="mt-4 max-w-xl font-[family:var(--font-display)] text-5xl leading-none md:text-6xl">
                Una iniciativa para darle forma publica al conocimiento
                financiero.
              </h2>
            </div>

            <div className="space-y-6">
              <p className="max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
                La base conceptual que tomo para esta version es consistente con
                lo que compartiste: un club que nace desde la UBA, que quiere
                explicar, publicar y demostrar valor academico sin caer en una
                estetica estudiantil basica ni en un tono sobreactuado.
              </p>
              <p className="max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
                No pude rescatar literalmente el texto del Canva sobre mision y
                quieneses somos porque el PDF no era legible por OCR en este
                entorno. Entonces resolvi lo importante: construir una narrativa
                institucional coherente con la marca y con la informacion que si
                compartiste.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {fundamentos.map((item) => (
              <article
                key={item.titulo}
                className="border border-[var(--color-line)] bg-white p-6 shadow-[0_20px_50px_rgba(10,28,64,0.05)]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-gold-dark)]">
                  {item.titulo}
                </p>
                <p className="mt-4 font-[family:var(--font-display)] text-3xl leading-tight text-[var(--color-blue)]">
                  {item.descripcion}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {principios.map((item) => (
              <article
                key={item.titulo}
                className="bg-[linear-gradient(180deg,#fffdf8_0%,#f7f1e6_100%)] p-6"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-gold-dark)]">
                  {item.numero}
                </p>
                <h3 className="mt-3 font-[family:var(--font-display)] text-4xl text-[var(--color-ink)]">
                  {item.titulo}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">
                  {item.descripcion}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="border-y border-[var(--color-line)] bg-[linear-gradient(180deg,#fbfaf6_0%,#f2ecdf_100%)]"
          id="areas"
        >
          <div className="mx-auto w-[min(1220px,92vw)] py-16 md:py-24">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--color-blue)]">
                  Estructura del club
                </p>
                <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none md:text-6xl">
                  Cuatro areas para producir contenido y construir continuidad.
                </h2>
              </div>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2">
              {areas.map((area, index) => (
                <article key={area.nombre} className="relative bg-white p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-gold-dark)]">
                    Area 0{index + 1}
                  </p>
                  <h3 className="mt-3 font-[family:var(--font-display)] text-5xl leading-none text-[var(--color-blue)]">
                    {area.nombre}
                  </h3>
                  <p className="mt-4 max-w-lg text-lg leading-8 text-[var(--color-muted)]">
                    {area.descripcion}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[28px] bg-[linear-gradient(180deg,#102d62_0%,#0a1a3f_100%)] p-8 text-white shadow-[0_24px_80px_rgba(10,28,64,0.25)]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                  Metodo de trabajo
                </p>
                <ol className="mt-6 space-y-5">
                  {metodo.map((paso, index) => (
                    <li key={paso} className="flex gap-4">
                      <span className="mt-1 font-[family:var(--font-display)] text-3xl text-[var(--color-gold)]">
                        0{index + 1}
                      </span>
                      <span className="text-base leading-7 text-[rgba(255,255,255,0.82)]">
                        {paso}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid gap-5">
                {audiencias.map((audiencia) => (
                  <article
                    key={audiencia}
                    className="border-l-4 border-[var(--color-gold)] bg-white p-6 shadow-[0_18px_40px_rgba(10,28,64,0.05)]"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-blue)]">
                      Para quien es
                    </p>
                    <p className="mt-3 font-[family:var(--font-display)] text-3xl leading-tight text-[var(--color-ink)]">
                      {audiencia}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="mx-auto w-[min(1220px,92vw)] py-16 md:py-24"
          id="publicaciones"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--color-blue)]">
                Ultimas publicaciones
              </p>
              <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none md:text-6xl">
                El frente editorial como principal activo de marca.
              </h2>
            </div>
            <a
              href="https://www.linkedin.com/company/club-de-finanzas-uba/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-blue)] hover:text-[var(--color-blue-strong)]"
            >
              Ver todas en LinkedIn
            </a>
          </div>

          <div className="mt-10 space-y-6">
            {publicaciones.map((item, index) => (
              <article
                key={item.titulo}
                className="grid gap-8 border border-[var(--color-line)] bg-white p-6 shadow-[0_22px_60px_rgba(10,28,64,0.05)] md:grid-cols-[1.2fr_260px] md:p-8"
              >
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-gold-dark)]">
                    {item.fecha} / {item.area}
                  </p>
                  <h3 className="mt-4 max-w-3xl font-[family:var(--font-display)] text-4xl leading-tight md:text-5xl">
                    {item.titulo}
                  </h3>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                    {item.descripcion}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center rounded-full bg-[var(--color-blue)] px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--color-blue-strong)]"
                  >
                    Leer publicacion
                  </a>
                </div>

                <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#102d62_0%,#173f84_100%)] p-6 text-white">
                  <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-[rgba(243,178,74,0.2)]" />
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[rgba(255,255,255,0.65)]">
                    {index === 0 ? "Destacada" : "Publicacion"}
                  </p>
                  <p className="mt-6 font-[family:var(--font-display)] text-5xl leading-none">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-base leading-7 text-[rgba(255,255,255,0.8)]">
                    Contenido pensado para circular en redes sin perder densidad
                    conceptual ni identidad visual.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="border-y border-[var(--color-line)] bg-[var(--color-blue)] text-white"
          id="alianzas"
        >
          <div className="mx-auto w-[min(1220px,92vw)] py-16 md:py-24">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[rgba(255,255,255,0.64)]">
                  Sponsors y colaboraciones
                </p>
                <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none md:text-6xl">
                  Una presentacion mas institucional para futuras alianzas.
                </h2>
              </div>
              <p className="max-w-3xl text-lg leading-8 text-[rgba(255,255,255,0.8)]">
                El deck de sponsors que compartiste ya marcaba esa necesidad. La
                web ahora acompana esa logica: presenta una identidad mas seria,
                ordena mejor el valor del club y deja espacio para partners,
                speakers y apoyos institucionales.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {aliados.map((item) => (
                <article
                  key={item.titulo}
                  className="border border-white/12 bg-[rgba(7,19,43,0.55)] p-6"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                    {item.titulo}
                  </p>
                  <p className="mt-4 font-[family:var(--font-display)] text-3xl leading-tight">
                    {item.descripcion}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="mx-auto w-[min(1220px,92vw)] py-16 md:py-24"
          id="comunidad"
        >
          <div className="grid gap-8 md:grid-cols-[0.86fr_1.14fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--color-blue)]">
                Comunidad y canales
              </p>
              <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none md:text-6xl">
                Una presencia digital mas solida, consistente y facil de seguir.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--color-muted)]">
                La comunidad es parte central del proyecto. Por eso la web deja
                de esconder los accesos y los convierte en un bloque
                protagonista, claro y alineado con la marca.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)]">
              {enlaces.map((item) => (
                <a
                  key={item.nombre}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 bg-white px-6 py-6 transition hover:bg-[rgba(18,63,137,0.04)]"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-gold-dark)]">
                    {item.nombre}
                  </span>
                  <span className="font-[family:var(--font-display)] text-4xl leading-none text-[var(--color-ink)]">
                    {item.detalle}
                  </span>
                </a>
              ))}

              <a
                href="mailto:hola@clubdefinanzasuba.com"
                className="flex flex-col gap-2 bg-[linear-gradient(180deg,#fff8ec_0%,#f5ebd6_100%)] px-6 py-7"
              >
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-blue)]">
                  Contacto institucional
                </span>
                <span className="font-[family:var(--font-display)] text-4xl leading-none text-[var(--color-ink)]">
                  hola@clubdefinanzasuba.com
                </span>
                <span className="text-base leading-7 text-[var(--color-muted)]">
                  Consultas, alianzas, workshops, charlas y propuestas de
                  colaboracion.
                </span>
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {faqs.map((item) => (
              <article
                key={item.pregunta}
                className="border-t-4 border-[var(--color-blue)] bg-white p-6 shadow-[0_18px_40px_rgba(10,28,64,0.05)]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-gold-dark)]">
                  {item.pregunta}
                </p>
                <p className="mt-4 text-lg leading-8 text-[var(--color-muted)]">
                  {item.respuesta}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--color-line)] bg-[#eee7d8]">
        <div className="mx-auto flex w-[min(1220px,92vw)] flex-col gap-4 py-8 text-sm text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            Club de Finanzas UBA. Identidad editorial e institucional reforzada.
          </p>
          <a
            href="https://roxiumlabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-blue)] hover:text-[var(--color-blue-strong)]"
          >
            Desarrollado por Roxium Labs
          </a>
        </div>
      </footer>
    </div>
  );
}
