import { MonitorGlobalDashboard } from "../components/monitor-global-dashboard";
import { SiteFooter, SiteHeader } from "../components/site-shell";

export default function MonitorGlobalPage() {
  return (
    <div className="min-h-screen text-[var(--color-ink)]">
      <SiteHeader currentPath="/monitor-global" />

      <main className="mx-auto w-[min(1240px,92vw)] py-12 md:py-16">
        <MonitorGlobalDashboard />
      </main>

      <SiteFooter />
    </div>
  );
}
