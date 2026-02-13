import type { FooterInfo } from "@/lib/types/storefront";

export default function GiftFooter({
  info,
}: {
  info?: FooterInfo;
}) {
  const footerInfo = info;

  if (!footerInfo) {
    return null;
  }

  return (
    <footer className="reveal border-t border-(--border) bg-(--surface-strong)" data-reveal>
      <div className="grid w-full gap-6 px-4 py-8 md:grid-cols-4 md:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-(--muted)">Sign Galaxy</p>
          <p className="mt-2 text-base font-semibold text-(--app-fg)">{footerInfo.brand}</p>
          <p className="mt-2 text-sm text-(--muted)">{footerInfo.description}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-(--app-fg)">Contact Us</p>
          <p className="mt-2 text-sm text-(--muted)">Phone: {footerInfo.phone}</p>
          <p className="text-sm text-(--muted)">Email: {footerInfo.email}</p>
          <p className="mt-1 text-sm text-(--muted)">{footerInfo.address}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-(--app-fg)">Quick Links</p>
          <ul className="mt-2 space-y-1">
            {footerInfo.links.map((item) => (
              <li key={item} className="text-sm text-(--muted)">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-(--surface-strong) p-4">
          <p className="text-sm font-semibold text-(--app-fg)">Confused what to buy?</p>
          <p className="mt-2 text-sm text-(--muted)">
            Ask our Gift Genie for perfect recommendations and personalized ideas.
          </p>
          <button className="mt-4 rounded-full bg-(--accent) px-4 py-2 text-xs uppercase tracking-[0.2em] text-white">
            Launch Gift Genie
          </button>
        </div>
      </div>

      <div className="border-t border-(--border) px-4 py-4 text-center text-xs text-(--muted)">
        {footerInfo.copyright}
      </div>
    </footer>
  );
}
