const publicaciones = [
  {
    fecha: "Febrero 2026",
    area: "Area Portafolio",
    titulo: "Portfolio Estrategia 2026",
    descripcion:
      "Analisis del escenario economico 2026 y criterios de asignacion para un portafolio diversificado.",
    href: "https://www.linkedin.com/posts/club-de-finanzas-uba_estrategia-2026-portafolio-ugcPost-7427859546221547520-MIMs?utm_source=social_share_send&utm_medium=ios_app&rcm=ACoAADfFs6QBrRwlErmxmoZqDDqkyL79ZUQN40Q&utm_campaign=copy_link",
  },
  {
    fecha: "Enero 2026",
    area: "Educacion Financiera",
    titulo: "Como leer un balance sin morir en el intento",
    descripcion:
      "Guia practica para estudiantes y profesionales que quieren interpretar estados contables con criterio.",
    href: "#",
  },
  {
    fecha: "Diciembre 2025",
    area: "Mercados",
    titulo: "Riesgo, tasa y horizonte: tres variables clave",
    descripcion:
      "Material introductorio para tomar decisiones de inversion de largo plazo con fundamentos.",
    href: "#",
  },
];

const eventos = [
  {
    fecha: "07 Mar 2026",
    titulo: "Taller abierto: Introduccion al mercado de capitales",
    lugar: "Facultad de Ciencias Economicas (UBA)",
  },
  {
    fecha: "21 Mar 2026",
    titulo: "Clinica de CV financiero y perfil profesional",
    lugar: "Modalidad hibrida",
  },
  {
    fecha: "11 Abr 2026",
    titulo: "Clase publica: Valuacion de empresas",
    lugar: "Ciudad Universitaria",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f3ea] text-[#202533]">
      <header className="border-b border-[#d2c7b1] bg-[linear-gradient(180deg,#fcfaf4,#f6f3ea)]" id="inicio">
        <nav className="mx-auto flex w-[min(1120px,92vw)] flex-wrap items-center justify-center gap-x-10 gap-y-3 py-8 text-xl text-[#b05349] sm:text-2xl [font-family:var(--font-title),serif]">
          <a className="hover:text-[#943f35]" href="#publicaciones">
            Publicaciones
          </a>
          <a className="hover:text-[#943f35]" href="#historia">
            Historia
          </a>
          <a className="hover:text-[#943f35]" href="#eventos">
            Eventos
          </a>
          <a className="hover:text-[#943f35]" href="#contacto">
            Contacto
          </a>
        </nav>

        <div className="mx-auto w-[min(1120px,92vw)] pb-16 pt-8 md:pb-24 md:pt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6a6f7d]">
            Club de Finanzas
          </p>
          <h1 className="mt-3 max-w-4xl text-5xl leading-[0.95] sm:text-6xl md:text-7xl [font-family:var(--font-title),serif]">
            Educacion financiera con base academica publica
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-[#505767] md:text-xl">
            Somos un grupo autoconvocado que crea contenido educativo y profesional para demostrar y validar
            los conocimientos que nos da la educacion publica, con integrantes de la UBA y otras
            universidades nacionales.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center bg-[#bf5b4f] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#9f473d]"
              href="#publicaciones"
            >
              Ver contenido
            </a>
            <a
              className="inline-flex items-center border border-[#202533] px-5 py-3 text-base font-semibold transition hover:bg-[#202533] hover:text-[#f6f3ea]"
              href="#whatsapp"
            >
              Sumarse al WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto w-[min(1120px,92vw)] py-14 md:py-20" id="publicaciones">
          <h2 className="text-5xl leading-none [font-family:var(--font-title),serif]">Ultimas publicaciones</h2>
          <div className="mt-4 h-[4px] w-full bg-[#bf5b4f]" />

          <div className="mt-10 space-y-12 md:space-y-16">
            {publicaciones.map((item, index) => (
              <article key={`${item.titulo}-${item.fecha}`} className="grid gap-8 border-b border-[#d2c7b1] pb-10 md:grid-cols-[1.4fr_0.9fr]">
                <div>
                  <p className="text-sm text-[#7e3f38]">{item.fecha} - {item.area}</p>
                  <h3 className="mt-2 text-4xl leading-tight [font-family:var(--font-title),serif]">{item.titulo}</h3>
                  <p className="mt-5 max-w-2xl text-lg text-[#505767]">{item.descripcion}</p>
                  <a
                    className="mt-6 inline-flex bg-[#bf5b4f] px-6 py-3 text-xl text-white [font-family:var(--font-title),serif] hover:bg-[#9f473d]"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leer mas
                  </a>
                </div>
                <div className="flex min-h-[340px] items-end border-8 border-[#a8463c] bg-[linear-gradient(145deg,#f2e6dd,#ccb3a8)] p-6">
                  <p className="text-3xl leading-tight text-[#3a1f1b] [font-family:var(--font-title),serif]">
                    {index === 0 ? "Edicion destacada" : "Analisis del equipo"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#d2c7b1] bg-[#faf7ef]" id="historia">
          <div className="mx-auto grid w-[min(1120px,92vw)] gap-8 py-14 md:grid-cols-[1.4fr_1fr] md:py-20">
            <div>
              <h2 className="text-5xl leading-none [font-family:var(--font-title),serif]">Nuestra historia</h2>
              <p className="mt-6 text-lg leading-8 text-[#505767]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
                ligula massa, varius a, semper congue, euismod non, mi.
              </p>
              <p className="mt-4 text-lg leading-8 text-[#505767]">
                Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet
                erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.
              </p>
            </div>
            <aside className="flex items-end bg-[#1f2638] p-7 text-[#f8f0e2]">
              <div>
                <p className="text-3xl leading-tight [font-family:var(--font-title),serif]">
                  "Creemos en una formacion financiera rigurosa, accesible y al servicio de la comunidad academica."
                </p>
                <p className="mt-5 text-sm tracking-[0.16em] uppercase text-[#d6c8b5]">Club de Finanzas</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto w-[min(1120px,92vw)] py-14 md:py-20" id="eventos">
          <h2 className="text-5xl leading-none [font-family:var(--font-title),serif]">Calendario de eventos</h2>
          <p className="mt-3 text-lg text-[#505767]">Actividades abiertas para la comunidad durante 2026.</p>

          <div className="mt-8 grid gap-4 md:grid-cols-[1fr_1.3fr]">
            <div className="bg-[#1f2638] p-4 text-[#f6f3ea]">
              <p className="text-3xl [font-family:var(--font-title),serif]">Marzo 2026</p>
              <div className="mt-4 grid grid-cols-7 gap-1 text-center text-sm">
                {["L", "M", "M", "J", "V", "S", "D"].map((day) => (
                  <span key={day} className="py-2 font-semibold text-[#d8cfbf]">
                    {day}
                  </span>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => (
                  <span
                    key={n}
                    className={`py-2 ${n === 7 || n === 21 ? "bg-[#bf5b4f] font-bold" : "bg-white/8"}`}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {eventos.map((evento) => (
                <article key={`${evento.fecha}-${evento.titulo}`} className="border border-[#d2c7b1] bg-[#fffdf7] p-5">
                  <p className="text-sm text-[#7e3f38]">{evento.fecha}</p>
                  <h3 className="mt-1 text-3xl leading-tight [font-family:var(--font-title),serif]">{evento.titulo}</h3>
                  <p className="mt-2 text-[#505767]">{evento.lugar}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#d2c7b1] bg-[#faf7ef]" id="whatsapp">
          <div className="mx-auto grid w-[min(1120px,92vw)] gap-6 py-14 md:grid-cols-2 md:py-20">
            <div>
              <h2 className="text-5xl leading-none [font-family:var(--font-title),serif]">Canales y comunidad</h2>
              <p className="mt-4 text-lg text-[#505767]">
                Seguinos para ver nuevas publicaciones, novedades de actividades y convocatorias.
              </p>
            </div>

            <ul className="overflow-hidden border border-[#23325a] bg-[#08122d] text-[#eef3ff]">
              <li className="border-b border-[#23325a] px-5 py-4">
                WhatsApp: {" "}
                <a className="underline underline-offset-2" href="https://whatsapp.com/channel/clubdefinanzasuba" target="_blank" rel="noopener noreferrer">
                  Channel /clubdefinanzasuba
                </a>
              </li>
              <li className="border-b border-[#23325a] px-5 py-4">
                Instagram: {" "}
                <a className="underline underline-offset-2" href="https://instagram.com/clubdefinanzasuba" target="_blank" rel="noopener noreferrer">
                  @clubdefinanzasuba
                </a>
              </li>
              <li className="border-b border-[#23325a] px-5 py-4">
                LinkedIn: {" "}
                <a className="underline underline-offset-2" href="https://www.linkedin.com/company/club-de-finanzas-uba/" target="_blank" rel="noopener noreferrer">
                  @club-de-finanzas-uba
                </a>
              </li>
              <li className="px-5 py-4">
                X: {" "}
                <a className="underline underline-offset-2" href="https://x.com/clubdefinanzasuba" target="_blank" rel="noopener noreferrer">
                  @clubdefinanzasuba
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section className="mx-auto w-[min(1120px,92vw)] py-14 md:py-20" id="contacto">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-6xl leading-none text-[#bf5b4f] [font-family:var(--font-title),serif]">Contactanos</h2>
            <p className="mt-4 text-center text-lg text-[#505767]">
              No te quedes con dudas, envianos tu consulta y te respondemos.
            </p>

            <form className="mt-10 grid gap-4">
              <label className="text-3xl [font-family:var(--font-title),serif]" htmlFor="nombre">Tu nombre</label>
              <input className="border border-[#d2c7b1] bg-white px-4 py-3 text-lg outline-none focus:border-[#bf5b4f]" id="nombre" name="nombre" type="text" />

              <label className="mt-3 text-3xl [font-family:var(--font-title),serif]" htmlFor="email">Tu correo electronico</label>
              <input className="border border-[#d2c7b1] bg-white px-4 py-3 text-lg outline-none focus:border-[#bf5b4f]" id="email" name="email" type="email" />

              <label className="mt-3 text-3xl [font-family:var(--font-title),serif]" htmlFor="asunto">Asunto</label>
              <input className="border border-[#d2c7b1] bg-white px-4 py-3 text-lg outline-none focus:border-[#bf5b4f]" id="asunto" name="asunto" type="text" />

              <label className="mt-3 text-3xl [font-family:var(--font-title),serif]" htmlFor="mensaje">Tu mensaje (opcional)</label>
              <textarea className="min-h-52 border border-[#d2c7b1] bg-white px-4 py-3 text-lg outline-none focus:border-[#bf5b4f]" id="mensaje" name="mensaje" rows={7} />

              <button type="submit" className="mt-3 w-fit bg-[#bf5b4f] px-6 py-3 text-xl text-white [font-family:var(--font-title),serif] hover:bg-[#9f473d]">
                Enviar consulta
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d2c7b1] bg-[#f1ebdd]">
        <div className="mx-auto w-[min(1120px,92vw)] py-6 text-center text-[#505767]">
          Desarrollado por {" "}
          <a className="font-semibold text-[#7e3f38] hover:underline" href="https://roxiumlabs.com" target="_blank" rel="noopener noreferrer">
            Roxium Labs
          </a>
        </div>
      </footer>
    </div>
  );
}
