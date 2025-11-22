"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/servers", label: "Servers" },
  { href: "/timeline", label: "Timeline" },
  { href: "/orgs", label: "Organizations" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[#30363d] bg-[#161b22] backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/dashboard" 
              className="text-xl font-bold bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] bg-clip-text text-transparent"
            >
              Sentric
            </Link>
            <div className="ml-10 flex space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium transition-all rounded-md ${
                      isActive
                        ? "bg-[#1f2937] text-[#58a6ff] border border-[#30363d]"
                        : "text-[#c9d1d9] hover:text-[#f0f6fc] hover:bg-[#1f2937]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

