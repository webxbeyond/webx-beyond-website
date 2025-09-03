import Link from 'next/link';
import { Iconify } from '@/components/iconify';
import { cn } from '@/lib/cn';
import { WebX } from '@/components/logo';

// Shared site footer
export function Footer() {
    const year = new Date().getFullYear();
    const menuLinks: { label: string; href: string; external?: boolean }[] = [
        { label: 'গিটহাব', href: 'https://github.com/webxbeyond', external: true },
        { label: 'টেক নিউজ', href: 'https://webxnewz.com', external: true },
        { label: 'AI ডিরেক্টরি', href: 'https://ai.webxbeyond.com/', external: true },
        { label: 'লাইসেন্স (MIT)', href: 'https://github.com/webxbeyond/webx-beyond-website/blob/main/LICENSE', external: true },
        { label: 'সাইটম্য়াপ', href: '/sitemap.xml' },
        { label: 'প্রাইভেসি (শীঘ্রই)', href: '/#' },
    ];

    return (
        <footer className="border-t bg-fd-card/80 backdrop-blur supports-[backdrop-filter]:bg-fd-card/60 mt-16 text-fd-secondary-foreground text-center">
            <div className="container py-12">
                {/* Brand / Mission */}
                <div className="space-y-5 max-w-md mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <div className="inline-flex size-9 items-center justify-center rounded-xl border border-fd-foreground/10 bg-fd-background/70 shadow-sm">
                            <WebX width={22} className="text-fd-primary" />
                        </div>
                        <div className="text-lg font-semibold tracking-tight group-hover:text-fd-primary transition-colors">ওয়েবএক্স বিওয়ান্ড</div>
                    </Link>
                    <p className="text-xs leading-relaxed text-fd-muted-foreground">
                        ওপেন, প্রগ্রেসিভ ও বাংলায় গভীর টেক শেখার রিসোর্স। কোড, ডেভঅপস, ক্লাউড, এআই ও আরও অনেক কিছু—এক জায়গায়।
                    </p>
                </div>

                {/* Menu below brand */}
                <nav aria-label="Footer Menu" className="mt-10">
                    <ul className="flex flex-wrap justify-center gap-y-3 text-xs">
                        {menuLinks.map((l, idx) => (
                            <li
                                key={l.href}
                                className={`px-3 flex items-center ${idx !== 0 ? 'border-l border-fd-foreground/15' : ''}`}
                            >
                                {l.external ? (
                                    <a
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors text-fd-muted-foreground hover:text-fd-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary/40 rounded-sm"
                                    >
                                        {l.label}
                                    </a>
                                ) : (
                                    <Link
                                        href={l.href}
                                        className="transition-colors text-fd-muted-foreground hover:text-fd-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary/40 rounded-sm"
                                    >
                                        {l.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Divider and Social Icons below menu */}
                <div className="mt-4 pt-4 flex items-center justify-center gap-4">
                    <SocialIcon href="https://github.com/webxbeyond" icon="mdi:github" label="GitHub" />
                    <SocialIcon href="https://x.com/money_is_shark" icon="ri:twitter-x-fill" label="X (Twitter)" />
                </div>

                <div className="mt-12 flex flex-col gap-2 border-t border-fd-foreground/10 pt-6 items-center justify-center">
                    <p className="text-[11px] text-fd-muted-foreground">© {year} সর্বস্বত্ত সংরক্ষিত · WebX Beyond · MIT Licensed </p>
                    <p className="text-[11px] text-fd-muted-foreground">Built with ❤️ & Fumadocs · v1</p>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ href, icon, label }: { href: string; icon: string; label: string }) {
    return (
        <Link
            href={href}
            aria-label={label}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={cn(
                'inline-flex size-8 items-center justify-center rounded-full border border-fd-foreground/10 bg-fd-background/70 text-fd-muted-foreground shadow-sm transition-colors',
                'hover:text-fd-primary hover:border-fd-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary/40'
            )}
        >
            <Iconify icon={icon} width={18} />
        </Link>
    );
}
