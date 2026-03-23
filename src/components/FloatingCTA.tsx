"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (~500px)
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Link
        href="/customize"
        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-primary-dark transition-all hover:scale-105"
      >
        <span className="text-lg">✨</span>
        つくる
      </Link>
    </div>
  );
}
