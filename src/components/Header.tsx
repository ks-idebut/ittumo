"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="bg-white border-b border-warm-gray-dark sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-wide text-accent">
          ittumo
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/items" className="hover:text-primary-dark transition-colors">
            アイテム一覧
          </Link>
          <Link href="/customize" className="hover:text-primary-dark transition-colors">
            オーダーメイド
          </Link>
          <Link href="/about" className="hover:text-primary-dark transition-colors">
            ittumoとは
          </Link>
          <Link
            href="/customize"
            className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-dark transition-colors"
          >
            つくる
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="メニュー"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-warm-gray-dark bg-white px-4 py-4 space-y-3">
          <Link href="/items" className="block py-2 hover:text-primary-dark" onClick={() => setIsMenuOpen(false)}>
            アイテム一覧
          </Link>
          <Link href="/customize" className="block py-2 hover:text-primary-dark" onClick={() => setIsMenuOpen(false)}>
            オーダーメイド
          </Link>
          <Link href="/about" className="block py-2 hover:text-primary-dark" onClick={() => setIsMenuOpen(false)}>
            ittumoとは
          </Link>
          <Link
            href="/customize"
            className="block text-center bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            つくる
          </Link>
        </nav>
      )}
    </header>
  );
}
