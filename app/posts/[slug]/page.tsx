import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { publicPostsService } from "../../services/public-posts-service";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const response = await publicPostsService.getBySlug(slug).catch(() => null);
  if (!response?.post) return notFound();

  const post = response.post;
  const media = post.assets[0];

  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader currentPath={post.type === "NEWSLETTER" ? "/newsletter" : `/${post.section.toLowerCase()}`} />
      <main className="mx-auto w-[min(980px,92vw)] space-y-8 py-12 md:py-16">
        <section className="rounded-[28px] border border-[var(--color-line)] bg-white p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-blue)]">{post.type}</p>
          <h1 className="mt-4 text-5xl font-[family:var(--font-display)] leading-tight">{post.title}</h1>
          <p className="mt-4 text-lg text-[var(--color-muted)]">{post.summary}</p>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("es-AR") : "Sin fecha"}
          </p>
        </section>

        {post.type === "REPORT" && media ? (
          <section className="rounded-[28px] border border-[var(--color-line)] bg-white p-4">
            <iframe title={post.title} src={media.url} className="h-[70vh] w-full rounded-2xl border border-[var(--color-line)]" />
          </section>
        ) : null}

        {post.type !== "REPORT" && post.type !== "NEWSLETTER" && media ? (
          <section className="rounded-[28px] border border-[var(--color-line)] bg-white p-4">
            <img src={media.url} alt={post.title} className="max-h-[70vh] w-full rounded-2xl object-cover" />
          </section>
        ) : null}

        {post.type === "NEWSLETTER" && post.assets.length ? (
          <section className="grid gap-4 md:grid-cols-2">
            {post.assets.map((asset) => (
              <article key={asset.id} className="rounded-[28px] border border-[var(--color-line)] bg-white p-4">
                <img src={asset.url} alt={post.title} className="max-h-[60vh] w-full rounded-2xl object-cover" />
              </article>
            ))}
          </section>
        ) : null}

        {post.body ? (
          <section className="rounded-[28px] border border-[var(--color-line)] bg-white p-6">
            <p className="whitespace-pre-line text-lg leading-8 text-[var(--color-muted)]">{post.body}</p>
          </section>
        ) : null}

        {post.type === "EVENT" && post.eventMeta?.registrationUrl ? (
          <a
            href={post.eventMeta.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-[var(--color-blue)] px-6 py-3 font-semibold text-white"
          >
            Inscribite
          </a>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
