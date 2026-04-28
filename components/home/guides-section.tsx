import { guides } from "@/lib/content/guides";

export function GuidesSection() {
  return (
    <section id="guides" className="scroll-mt-24 border-t border-border pt-10">
      <h2 className="text-lg font-semibold">Notes</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Short tips for tuning halftone — same stuff you’d want in a readme, just on the page.
      </p>
      <ul className="mt-6 space-y-8">
        {guides.map((guide) => (
          <li key={guide.slug} className="max-w-3xl">
            <h3 className="font-medium">{guide.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{guide.description}</p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-foreground/90">
              {guide.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
